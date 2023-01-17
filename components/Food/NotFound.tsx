import Link from 'next/link'
import {FC} from 'react'
import styles from './NotFound.module.css'

const Notfound = () => {
    return (
        <div className={styles.container_main}>
            <div className={styles.container_header}>
                404
            </div>
            <div className={styles.container_desc}>
                The page that you are looking for doesn't exist
            </div>
                <button className={styles.button}><Link href="/food">Return</Link></button>
        </div>
    )
}

export default Notfound