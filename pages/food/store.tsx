import { NextPage } from "next";
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from "../../styles/Store.module.css"
import { Poppins } from "@next/font/google";
import Navbar from "../../components/Food/Navbar";
import NotFound from "../../components/Food/NotFound";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { FC, useContext, useEffect, useRef, useState } from "react";
import Loading from "../../components/Food/Loading";
import UserContext from "../../context/user-context";
import toast from "react-hot-toast";
const poppins = Poppins({ weight: '400' });

interface propsType {
    names: Array<string>,
}

interface storeDataInterface {
    id: string,
    name: string,
    address: string,
    delivery_fee: number,
    rating: number,
    open_time: string,
    menus: [{ name: string, foods: [{ id: string, picture: boolean, name: string, price: number }] }]
}

const Sidebar: FC<propsType> = (props) => {
    return (
        <div className={styles.sidebar}>
            {props.names.map((name, k) => {
                return (
                    <div className={styles.sidebar_item} key={k}>
                        <button className={styles.sidebar_button} value={name} />
                    </div>
                )
            })}
        </div>
    )
}

const Store: NextPage = () => {
    const router = useRouter()
    const [data, setStoreData] = useState({} as storeDataInterface)
    const [state, setState] = useState(0)
    const { sid } = router.query
    const ref = useRef(new Array())
    const ctx = useContext(UserContext)

    useEffect(() => {
        if (!sid) return
        fetch('/api/data/store_menu?storeid=' + sid, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (data.message == "Invalid!") {
                    setState(1)
                } else {
                    setStoreData(data.data)
                    setState(2)
                }
            })
    }, [sid])

    if (state === 0) {
        return (
            <>
                <Navbar />
                <Loading />
            </>
        )
    }

    if (state === 1) {
        return (
            <>
                <Navbar />
                <NotFound />
            </>
        )
    }

    return (
        <div className={poppins.className}>
            <Navbar />
            <div className={styles.container_header}>
                <div className={styles.container_header_pic}>
                    <Image className={styles.header_pic} src={`/images/store/store.jpg`} alt="Store Logo" fill={true} />
                </div>
                <div className={styles.header_info}>
                    <span className={styles.info_name}>
                        <h1>{data.name}</h1>
                        - <p>Open {data.open_time}</p>
                    </span>
                    <p>{data.address}</p>
                    <AiFillStar /> {data.rating} • 30-45 minutes • {data.delivery_fee}$ Delivery Fee
                </div>
            </div>
            <div className={styles.container_main}>
                <div className={styles.container_sidebar}>
                    {data.menus.map(({ name }, k) => {
                        return (
                            <div className={styles.sidebar_item} key={k}>
                                <button className={styles.sidebar_button} onClick={() => {
                                    ref.current[k].scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }}>{name}</button>
                            </div>
                        )
                    })}
                </div>
                <ul className={styles.container_menu}>
                    {data.menus.map(({ name, foods }, k) => {
                        return (
                            <li className={styles.menu} key={k} id={name} ref={(element) => ref.current[k] = element}>
                                <div className={styles.menu_name}>
                                    {name}
                                </div>
                                <div className={styles.menu_foods}>
                                    {foods.map((food) => {
                                        return (
                                            <div className={styles.foodcard} key={food.id}>
                                                <div className={styles.foodcard_header} onClick={() => {
                                                    ctx.addToCart(food.id)
                                                    toast.success('Item added to cart successfully!', {
                                                        style: {
                                                            fontSize: '14px',
                                                            fontWeight: '700'
                                                        },
                                                        iconTheme: {
                                                            primary: '#FF6701',
                                                            secondary: '#ffffff'
                                                        }
                                                    })
                                                }
                                                }>
                                                    <div className={styles.button_cart}>
                                                        <AiOutlinePlus />
                                                    </div>
                                                    <Image src={food.picture ? '/images/store/' + food.id : '/images/store/food.jpg'}
                                                        alt="food picture" width={350} height={200} />
                                                </div>
                                                <div className={styles.foodcard_desc}>
                                                    <h3>
                                                        {food.name}
                                                    </h3>
                                                    <h6>
                                                        {food.price}$
                                                    </h6>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div >
    )
}

export default Store