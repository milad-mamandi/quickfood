import { FC, useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { BsFillCartFill, BsTrash } from 'react-icons/bs'
import Image from 'next/image'
import QuanityInput from './QuanityInput'
import UserContext from '../../context/user-context'

interface propsType {
    items: string[],
}
interface resultType {
    id: string,
    name: string,
    picture: boolean,
    price: number,
}
interface dataType extends resultType {
    count: number
}

const Cart: FC<propsType> = (props) => {
    const ctx = useContext(UserContext)
    const [cartData, setCartData] = useState<Array<dataType>>([])
    const [hover, setHover] = useState(false)

    const params = { 'items': JSON.stringify(props.items) }
    useEffect(() => {
        if (props.items.length > 0) {
            fetch('/api/data/cart?' + new URLSearchParams(params), { method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    const items = data.data
                    setCartData([])
                    items.forEach((item: resultType) => {
                        const len = props.items.filter(x => x === item.id).length
                        setCartData(prev => [...prev, { ...item, count: len }])
                    });
                })
        } else {
            setCartData([])
        }
    }, [props.items])

    const getPrice = () => {
        let price = 0
        cartData.forEach(item => {
            price += item.count * item.price
        })
        return Math.round(price * 10) / 10
    }

    return (
        <div className={styles.container_main} onMouseEnter={() => setHover(true)} >
            <div className={styles.container_button}>
                <BsFillCartFill />
                <span>Cart</span>
                {props.items.length > 0 &&
                    <>
                        <span>•</span>
                        <span>{props.items.length}</span>
                    </>
                }
            </div>
            <div className={styles.container_popup} style={{ display: hover ? 'flex' : 'none' }} onMouseLeave={() => setHover(false)}>
                {cartData.length < 1 ?
                    <>
                        <div>No items in your cart</div>
                    </>
                    :
                    <>
                        {cartData.map((item, k) => {
                            return (
                                <div className={styles.container_item} key={k}>
                                    <div className={styles.cart_item}>
                                        <Image src={item.picture ? '/images/store/' + item.id + '.jpg' : '/images/store/food.jpg'} alt='cart item picture'
                                            width={48} height={48} style={{objectFit:"cover"}} quality={100}/>
                                        <div className={styles.cart_item_desc}>
                                            <div className={styles.cart_item_desc_name}>
                                                {item.name}
                                            </div>
                                            <div className={styles.cart_item_desc_price}>
                                                {item.price}$
                                            </div>
                                        </div>
                                        <div className={styles.cart_item_action}>
                                            <QuanityInput initial={item.count} id={item.id} />
                                            <BsTrash className={styles.cart_item_trash} onClick={() => ctx.deleteFromCart(item.id)} />
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                        <div className={styles.cart_end} >
                            <div className={styles.cart_end_price}>
                                Subtotal: <span>{getPrice()}$</span>
                            </div>
                            <div>
                                <button className={styles.cart_end_checkout}>
                                    Checkout
                                </button>
                                <button className={styles.cart_end_clear} onClick={ctx.clearCart}>
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Cart;