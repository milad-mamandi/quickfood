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
    if (props.data.length > 0) {
        console.log(props.data.length);
        return (
            <>
                {props.data.map((store) => {
                    return (
                        <div className={styles.container_store}>
                            <Image src={`/images/store/logo.jpg`}
                                alt='Store logo'
                                width={320}
                                height={128} />
                            <div className={styles.container_desc}>
                                <div className={styles.name}>
                                    {store.name}
                                </div>
                                <div className={styles.rating}>
                                    {store.rating}
                                    <AiFillStar />
                                </div>
                            </div>
                            <div className={`${styles.container_info} ${lightPoppins.className}`}>
                                <MdDeliveryDining className={styles.info_logo} />
                                <div className={styles.spacer}>
                                    • ${store.delivery_fee} Delivery Fee
                                </div>
                                <div className={styles.spacer}>
                                    • 15-25 min
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    } else {
        return null
    }
}

export default Stores