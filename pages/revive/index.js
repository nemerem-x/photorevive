import styles from '@/styles/Home.module.css'
import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function index() {

    const [file, setFile] = useState({})

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0])
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className={styles.revivepage}>
        <h1>Revive any face photo.</h1>
        <p>Upload and let AI revive your photo.</p>

        <div className={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    </div>
  )
}
