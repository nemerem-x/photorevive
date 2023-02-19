import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/logo.png'

export default function Header() {

  return (
    <div className={styles.header}>
        <Link href='/'><Image src={logo} width='200' alt='logo'/></Link>
        <p>GFP-GAN</p>
    </div>
  )
}
