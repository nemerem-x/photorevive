import styles from '@/styles/Home.module.css'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../src/firebase';
import Image from 'next/image';
import loading from '/public/load3.gif'
import loading2 from '/public/load4.gif'
import { saveAs } from 'file-saver'
import { motion } from 'framer-motion';

export default function Revive() {

    const [file, setFile] = useState(null)
    const [percent, setPercent] = useState(0)
    const [complete, setComplete] = useState(false)
    const [getRevampedcomplete, setGetRevampedcomplete] = useState(false)
    const [dropped, setDropped] = useState(false)
    const [originalImageUrl, setOriginalImageUrl] = useState('')
    const [revampedImageUrl, setRevampedImageUrl] = useState('')

    const newUpload = () => {
        setComplete(false)
        setDropped(false)
    }

    const handleUpload = () => {
        if(file?.name) {

            const storageRef = ref(storage, `images/${file?.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 98
                    );
                        setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setOriginalImageUrl(url)
                        getRevivedImage(url)
                        setComplete(true)
                    });
                }
            );
        }
    }

    useEffect(()=>{
        handleUpload()
    },[file])

    const getRevivedImage = async (url) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        try {
            const res = await fetch("/api/revive", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({imageUrl: url})
            })
    
            const data = await res.json()
            setRevampedImageUrl(data)
            setGetRevampedcomplete(true)
            
        } catch (error) {
            console.log(error)
        }
    }

    const downloadImage = () => {
        saveAs(revampedImageUrl, `${file.name} revived`)
    }

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0])
        setDropped(true)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <motion.div
        initial={{ opacity: 0, y: -20}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <div className={styles.revivepage}>
            <p>Face restoration algorithm for old photos or AI-generated faces</p>
            <h1>Revive any face photo.</h1>
            <p>Upload and let AI revive your photo.</p>
            {
                !complete ?
                <div className={styles.dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
           
                    { dropped ?
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <div className={styles.innerdropzone}>
                                <button>Upload photo</button>
                                <p> ...or Drag and drop an photo</p>
                            </div>
                        :
                        <>
                        <p className={styles.percent}>{percent}%</p>
                        <Image className={styles.loading} src={loading} width='400' height='400' alt='loading...' />
                        </>
                    }

                </div>
                :
                <div className={styles.revampedsection}>
                    <div className={styles.imagesection}>
                        {   
                            originalImageUrl &&
                            <div>
                                <p>Original photo</p>
                                <Image src={originalImageUrl} width='400' height='400' alt='original photo' />
                            </div>
                        }
                        {
                            revampedImageUrl &&
                            <div>
                                <p>Revamped photo</p>
                                {
                                    revampedImageUrl == "failed" ? <p>failed</p> :
                                    <Image src={revampedImageUrl} width='400' height='400' alt='could not load revamped photo' />
                                }
                            </div>
                            
                            
                        }
                    </div>
                    <div className={styles.buttonsection}>
                        {   revampedImageUrl &&
                            <>
                                <button onClick={newUpload}>Upload new photo</button>
                                <button onClick={downloadImage}>Download revamped photo</button>
                            </>
                        }
                        {
                            originalImageUrl && !getRevampedcomplete &&
                            <>
                                <Image className={styles.loading2} src={loading2} width='80' height='80' alt='loading...' />
                            </>
                        }
                    </div>
                </div>
            }

        </div>
        </motion.div>
    )
}
