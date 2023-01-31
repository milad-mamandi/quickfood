import { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import styles from "../../styles/Panel.module.css"
import { Dosis, Poppins } from "@next/font/google";
import { BiStoreAlt, BiCoinStack } from 'react-icons/bi'
import { MdFastfood, MdExitToApp } from 'react-icons/md'
import Store from "./store";
import Food from "./food";
import Order from "./order";
import { useRouter } from "next/router";

const dosis = Dosis()
const poppins = Poppins({ weight: '400' })

interface dataType {
    id: string,
    name: string,
    address: string,
    delivery_fee: number,
    open_time: string,
    rating: number,
}
const initialData = {
    id: '',
    name: '',
    address: '',
    delivery_fee: 0,
    open_time: '',
    rating: 0,
}

const Panel: NextPage = () => {
    const ctx = useContext(AuthContext)
    const router = useRouter()
    const [data, setData] = useState<dataType>(initialData)
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState(<></>)
    useEffect(() => {
        if (ctx.isAdmin) {
            setLoading(true)
            fetch('/api/panel/panel?email=' + ctx.email, { method: 'GET' })
                .then(res => res.json())
                .then((payload) => {
                    setData(payload.data.store)
                    setLoading(false)
                    if (!page.key)
                        setPage(<Store data={payload.data.store} />)
                })
        }
    }, [ctx.isAdmin])



    return (
        <div className={`${styles.container_main} ${poppins.className}`}>
            <div className={styles.container_sidebar}>
                <Link href='/'><p className={`${dosis.className} ${styles.logo}`}>Quick<b className={styles.bold}>Food</b></p></Link>
                <ul className={styles.list}>
                    <li onClick={() => setPage(<Store data={data} />)}><BiStoreAlt /> Store</li>
                    <li onClick={() => setPage(<Food id={data.id} />)}><MdFastfood /> Foods</li>
                    <li onClick={() => setPage(<Order id={data.id} />)}><BiCoinStack /> Orders</li>
                    <li onClick={() => {
                        ctx.logout()
                        router.push('/')
                    }}><MdExitToApp /> Log Out</li>
                </ul>
            </div>
            <div className={styles.container_panel}>
                {!isLoading && page}
            </div>
        </div>
    )
}


export default Panel