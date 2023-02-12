import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Header() {

  return (
    <div className={styles.header}>
        <Link href='/'><h1>PhotoRevive</h1></Link>
        <p>Swin Transformer</p>
    </div>
  )
}
