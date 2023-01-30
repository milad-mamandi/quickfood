import { FC, useEffect, useReducer, useState } from 'react'
import styles from './Filterbar.module.css'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { AiFillTag } from 'react-icons/ai'
import { RiMedal2Fill } from 'react-icons/ri'
import Slider from '../UI/Slider'

const Filterbar: FC<propsType> = (props) => {
    const [fbState, fbDispatch] = useReducer(filterbarReducer, filterbarInit);
    const [data, dataDispatch] = useReducer(dataReducer, dataInit);

    useEffect(() => {
        if (props.data !== data)
            dataDispatch({ type: 'render', payload: props.data })
    }, [])

    useEffect(() => {
        props.onChange(data)
    }, [data])

    return (
        <div className={styles.container_main}>
            <div className={styles.container_filter}>
                <div className={styles.container_header} onClick={() => fbDispatch({ type: 'sort' })}>
                    Sort
                    {fbState.sort ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
                </div>
                <div className={`${styles.container_content} ${fbState.sort && styles.collapse}`}>
                    <label className={styles.container_radio}>Most Popular
                        <input type="radio" name="radio" checked={props.data.sort === 1 ? true : false} onChange={() => dataDispatch({ type: 'sort', payload: 1 })} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label className={styles.container_radio}>Rating
                        <input type="radio" name="radio" checked={props.data.sort === 2 ? true : false} onChange={() => dataDispatch({ type: 'sort', payload: 2 })} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label className={styles.container_radio}>Distance
                        <input type="radio" name="radio" checked={props.data.sort === 3 ? true : false} onChange={() => dataDispatch({ type: 'sort', payload: 3 })} />
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
                            <input type="checkbox" checked={(props.data.optn === 1 || props.data.optn === 3) ? true : false} onChange={() => dataDispatch({ type: 'optn', payload: 1 })} />
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                    </div>
                    <div className={styles.container_item}>
                        <div>
                            <RiMedal2Fill className={styles.icon} />
                            Top Restaurants
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={(props.data.optn === 2 || props.data.optn === 3) ? true : false} onChange={() => dataDispatch({ type: 'optn', payload: 2 })} />
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
                        <div className={styles.price} onClick={() => dataDispatch({ type: 'pr', payload: 1 })}>$</div>
                        <div className={styles.price} onClick={() => dataDispatch({ type: 'pr', payload: 2 })}>$$</div>
                        <div className={styles.price} onClick={() => dataDispatch({ type: 'pr', payload: 3 })}>$$$</div>
                        <div className={styles.price} onClick={() => dataDispatch({ type: 'pr', payload: 4 })}>$$$$</div>
                    </div>
                </div>
            </div >
            <div className={styles.container_filter}>
                <div className={styles.container_header} onClick={() => fbDispatch({ type: 'df' })}>
                    Delivery Fee
                    {fbState.df ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
                </div>
                <div className={`${styles.container_content} ${fbState.df && styles.collapse}`}>
                    <Slider value={props.data.df} onChange={(value) => dataDispatch({ type: 'df', payload: value })} />
                </div>
            </div>
        </div>
    )
}

interface propsType {
    onChange: (data: dataType) => void,
    data: dataType
}

interface dataType {
    sort: number, optn: number, pr: number, df: number
}

interface filterbarState {
    sort: boolean,
    optn: boolean,
    pr: boolean,
    df: boolean
}
interface dataState {
    sort: number,
    optn: number,
    pr: number,
    df: number
}

const filterbarInit = {
    sort: false,
    optn: false,
    pr: false,
    df: false
}

const dataInit = {
    sort: 0,
    optn: 0,
    pr: 0,
    df: 0
}

interface actionType {
    type: string,
    payload?: any
}

const filterbarReducer = (state: filterbarState, action: actionType) => {
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

const dataReducer = (state: dataState, action: actionType) => {
    switch (action.type) {
        case 'sort':
            return { ...state, sort: action.payload || 0 }
        case 'optn':
            console.log(state.optn);
            if (state.optn === 0)
                return { ...state, optn: action.payload || 0 }
            if (state.optn === action.payload)
                return { ...state, optn: 0 }
            if (state.optn === 3)
                return { ...state, optn: state.optn - (Number(action.payload) || 0) }
            if (state.optn !== action.payload)
                return { ...state, optn: 3 }
        case 'pr':
            return { ...state, pr: action.payload || 0 }
        case 'df':
            return { ...state, df: action.payload || 0 }
        case 'render':
            return action.payload
        default:
            throw new Error();
    }
}

export default Filterbar