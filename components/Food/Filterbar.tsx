import { FC, useReducer, useState } from 'react'
import styles from './Filterbar.module.css'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { AiFillTag } from 'react-icons/ai'
import { RiMedal2Fill } from 'react-icons/ri'
import Slider from '../UI/Slider'

interface filterbarState {
    sort: boolean,
    optn: boolean,
    pr: boolean,
    df: boolean
}

interface filberbarAction {
    type: string
}

const filterbarInit = {
    sort: false,
    optn: false,
    pr: false,
    df: false
}

const filterbarReducer = (state: filterbarState, action: filberbarAction) => {
    switch (action.type) {
        case 'sort':
            return { ...state, sort: !state.sort }
        case 'optn':
            return { ...state, optn: !state.optn }
        case 'pr':
            return { ...state, pr: !state.pr }
        case 'df':
            return { ...state, df: !state.df }
        default:
            throw new Error();
    }
}
const Filterbar: FC = () => {

    const [fbState, fbDispatch] = useReducer(filterbarReducer, filterbarInit);

    return (
        <div className={styles.container_main}>
            <div className={styles.container_filter}>
                <div className={styles.container_header} onClick={() => fbDispatch({ type: 'sort' })}>
                    Sort
                    {fbState.sort ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
                </div>
                <div className={`${styles.container_content} ${fbState.sort && styles.collapse}`}>

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
            </div>
            <div className={styles.container_filter}>
                <div className={styles.container_header} onClick={() => fbDispatch({ type: 'optn' })}>
                    Options
                    {fbState.optn ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
                </div>
                <div className={`${styles.container_content} ${fbState.optn && styles.collapse}`}>
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
            </div>
            <div className={styles.container_filter}>
                <div className={styles.container_header} onClick={() => fbDispatch({ type: 'pr' })}>
                    Price Range
                    {fbState.pr ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
                </div>
                <div className={`${styles.container_content} ${fbState.pr && styles.collapse}`}>
                    <div className={styles.container_price}>
                        <div className={styles.price}>$</div>
                        <div className={styles.price}>$$</div>
                        <div className={styles.price}>$$$</div>
                        <div className={styles.price}>$$$$</div>
                    </div>
                </div>
            </div >
            <div className={styles.container_filter}>
                <div className={styles.container_header} onClick={() => fbDispatch({ type: 'df' })}>
                    Delivery Fee
                    {fbState.df ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
                </div>
                <div className={`${styles.container_content} ${fbState.df && styles.collapse}`}>
                    <Slider />
                </div>
            </div>
        </div>
    )
}

export default Filterbar