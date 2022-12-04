import { FC } from 'react'
import styles from './Filterbar.module.css'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { AiFillTag } from 'react-icons/ai'
import { RiMedal2Fill } from 'react-icons/ri'
import Slider from '../UI/Slider'

const Filterbar: FC = () => {
    return (
        <div className={styles.container_main}>
            <div className={styles.container_filter}>
                <div className={styles.container_header}>
                    Sort
                    <MdOutlineKeyboardArrowUp />
                </div>
                <label className={styles.container_radio}>Most Popular
                    <input type="radio" name="radio" />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.container_radio}>Rating
                    <input type="radio" name="radio" />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.container_radio}>Distance
                    <input type="radio" name="radio" />
                    <span className={styles.checkmark}></span>
                </label>
            </div>
            <div className={styles.container_filter}>
                <div className={styles.container_header}>
                    Options
                    <MdOutlineKeyboardArrowUp />
                </div>
                <div className={styles.container_item}>
                    <div>
                        <AiFillTag className={styles.icon} />
                        Deals
                    </div>
                    <label className={styles.switch}>
                        <input type="checkbox" />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                </div>
                <div className={styles.container_item}>
                    <div>
                        <RiMedal2Fill className={styles.icon} />
                        Top Restaurants
                    </div>
                    <label className={styles.switch}>
                        <input type="checkbox" />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={styles.container_filter}>
                <div className={styles.container_header}>
                    Price Range
                    <MdOutlineKeyboardArrowUp />
                </div>
                <div className={styles.container_price}>
                    <div className={styles.price}>$</div>
                    <div className={styles.price}>$$</div>
                    <div className={styles.price}>$$$</div>
                    <div className={styles.price}>$$$$</div>
                </div>
            </div >
            <div className={styles.container_filter}>
                <div className={styles.container_header}>
                    Delivery Fee
                    <MdOutlineKeyboardArrowUp />
                </div>
                <Slider />
            </div>
        </div>
    )
}

export default Filterbar