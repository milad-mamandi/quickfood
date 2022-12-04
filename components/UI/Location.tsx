import { FC } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import styles from './Location.module.css'
interface propsInterface {
    location: string,
    time: string
}

const Location: FC<propsInterface> = (props) => {
    return (
        <span className={styles.container}>
            <IoLocationSharp className={styles.icon} />
            <div className={styles.location_text}>{props.location}</div>
            <div className={styles.dot}>•</div>
            <div className={styles.time_text}>{props.time}</div>
        </span>
    )
}

export default Location