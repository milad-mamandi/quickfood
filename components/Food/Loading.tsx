import { FC } from 'react'
import styles from './Loading.module.css'

const items = Array.from(Array(12).keys())

const Loading: FC = () => {
    return (
        <div className={styles.container_main}>
            {items.map((key) => {
                return (
                    <div className={styles.container_item} key={key}>
                        <div className={styles.placeholder_image} />
                        <div className={styles.container_desc}>
                            <div className={styles.container_text}>
                                <div className={styles.placeholder_text} />
                                <div className={styles.placeholder_small_text} />
                            </div>
                            <div className={styles.placeholder_rating} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Loading