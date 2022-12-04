import { FC } from 'react'
import styles from './Cart.module.css'
import {BsFillCartFill} from 'react-icons/bs'

interface propsType {
    itemcount : number,
}

const Cart : FC<propsType> = (props) => {
    return (
        <div className={styles.container_main}>
            <BsFillCartFill />
            <span>Cart</span>
            <span>•</span>
            <span>{props.itemcount}</span>
        </div>
    )
}

export default Cart;