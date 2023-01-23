import { FC, useContext, useState } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import UserContext from '../../context/user-context'
import styles from './QuanityInput.module.css'

interface propsType {
    id: string,
    initial: number,
}

const QuanityInput: FC<propsType> = (props) => {
    const ctx = useContext(UserContext)
    
    const change = (i: boolean) => {
        if (i) {
            if (props.initial + 1 > 10) return
            ctx.addToCart(props.id)
        } else {
            if (props.initial - 1 < 1) return
            ctx.removeFromCart(props.id)
        }
    }
    return (
        <div className={styles.container_main}>
            <div className={styles.number}>
                {props.initial}
            </div>
            <div className={styles.container_arrow}>
                <div className={styles.button_style} onClick={() => change(true)}>
                    <AiOutlineUp />
                </div>
                <div className={styles.button_style} onClick={() => change(false)}>
                    <AiOutlineDown />
                </div>
            </div>
        </div>
    )
}

export default QuanityInput