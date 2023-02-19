import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import original from '../public/badImage.png'
import revived from '../public/goodImage.png'
import { motion } from 'framer-motion';

export default function Home() {

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 15 }}
      transition={{ duration: 0.5 }}
      >
      <main className={styles.main}>
        <div className={styles.info}>
          <p>Face restoration algorithm for old photos or AI-generated faces</p>
          <h1>Making old photos new again with AI</h1>
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
      </motion.div>
    </>
  )
}
