import styles from '@/styles/Home.module.css'
import original from '../../public/badImage.png'
import revived from '../../public/goodImage.png'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../components/firebase';
import Image from 'next/image';

export default function index() {

    const [file, setFile] = useState({})
    const [percent, setPercent] = useState(0)
    const [complete, setComplete] = useState(false)
    const [dropped, setDropped] = useState(false)
    const [originalImageUrl, setOriginalImageUrl] = useState('')
    const [revampedImageUrl, setRevampedImageUrl] = useState('')

    const handleUpload = () => {
        if(file.name) {

            const storageRef = ref(storage, `images/${file?.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                        setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setOriginalImageUrl(url)
                        setComplete(true)
                    });
                }
            );
        }
    }

    useEffect(()=>{
        handleUpload()
    },[file])

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0])
        setDropped(true)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className={styles.revivepage}>
            <h1>Revive any face photo.</h1>
            <p>Upload and let AI revive your photo.</p>

            {
                !complete ?
                <div className={styles.dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
           
                    { !dropped ?
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        :
                        <p>{percent}%</p>
                    }

                </div>
                :
                <div className={styles.revampedsection}>
                    <div className={styles.imagesection}>
                        {   
                            originalImageUrl &&
                            <div>
                                <p>Original Image</p>
                                <Image src={originalImageUrl} width='400' height='400' alt='original image' />
                            </div>
                        }
                        {
                            revampedImageUrl &&
                            <div>
                                <p>Revamped Image</p>
                                <Image src={revived} width='400' height='400' alt='original image' />
                            </div>
                        }
                    </div>
                    <div className={styles.buttonsection}>
                        <button onClick={setComplete(false)}>Upload new image</button>
                        <button>Download revamped image</button>
                    </div>
                </div>
            }

        </div>
    )
}
