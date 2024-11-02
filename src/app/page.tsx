import Image from 'next/image'
import styles from './page.module.css'
import Index from '@/components'

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Bubble />
      <div className={styles.maskedAuthorTitle}>
        <AuthorTitle />
      </div> */}
      <Index />
    </main>
  )
}
