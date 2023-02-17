import Header from "./Header"
import Footer from "./Footer"
import styles from '@/styles/Home.module.css'

export default function Layout({children}) {
  return (
    <div className={styles.fullpage}>
        <Header />
        {children}
        <Footer/>
    </div>
  )
}
