import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import original from '../public/badImage.png'
import revived from '../public/goodImage.png'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.info}>
          <p>Face restoration algorithm for old photos or AI-generated faces</p>
          <h1>Making old photos new again through AI</h1>
          <p>Bring your faded and unclear face photos back to 
            life with the help of AI. Keep those cherished 
            memories alive for free. Start restoring your photos now.
          </p>
          <Link href='/revive'><button>Restore photo</button></Link>
        </div>
        <div className={styles.imagesection}>
          <div>
            <p>Original Photo</p>
            <Image src={original} width='400' height='400' alt='original image' />
          </div>
          <div>
            <p>Revived Photo</p>
            <Image src={revived} width='400' height='400' alt='original image' />
          </div>
        </div>
      </main>
    </>
  )
}
