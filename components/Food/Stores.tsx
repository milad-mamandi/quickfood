import { FC } from 'react'
import styles from './Stores.module.css'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import { MdDeliveryDining } from 'react-icons/md'
import { Poppins } from '@next/font/google'

interface dataType {
    id: string,
    name: string,
    address: string,
    delivery_fee: number,
    rating: number,
    open_time: string
}
interface propsType {
    data: Array<dataType>;
}
const lightPoppins = Poppins({ weight: '300' })

const Stores: FC<propsType> = (props) => {
    if (props.data.length > 0)
        return (
            <div className={styles.container_store}>
                {/* <Image src='/images/store/wendy/logo.jpg' alt='Store logo' width={320} height={128} />
            <div className={styles.container_desc}>
                <div className={styles.name}>
                    unga bunga store unga bunga store unga bunga store
                </div>
                <div className={styles.rating}>
                    4.7
                    <AiFillStar />
                </div>
            </div>
            <div className={`${styles.container_info} ${lightPoppins.className}`}>
                <MdDeliveryDining className={styles.info_logo} />
                <div className={styles.spacer}>
                    • $3.99 Delivery Fee
                </div>
                <div className={styles.spacer}>
                    • 15-25 min
                </div>

            </div> */}
            </div>
        )
    return null
}

export default Stores