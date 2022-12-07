import { FC } from 'react'
import styles from './Stores.module.css'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'

const Stores: FC = () => {
    return (
        <div className={styles.container_store}>
            <Image src='/images/store/wendy/logo.jpg' alt='Store logo' width={320} height={128} />
            <div className={styles.container_desc}>
                <div className={styles.name}>
                    unga bunga store unga bunga store unga bunga store
                </div>
                    <div className={styles.rating}>
                        4.7
                        <AiFillStar />
                    </div>
            </div>
        </div>
    )
}

export default Stores