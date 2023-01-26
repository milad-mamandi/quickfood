import { NextPage } from "next";
import styles from '../../styles/Food.module.css'
import Navbar from "../../components/Food/Navbar";
import Loading from "../../components/Food/Loading";
import Categories from "../../components/Food/Categories";
import Filterbar from "../../components/Food/Filterbar";
import Stores from "../../components/Food/Stores";
import { Poppins } from "@next/font/google";
import { useEffect, useState } from "react";
const poppins = Poppins({ weight: '400' });

const Food: NextPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [storeData, setStoreData] = useState([])
    const [params, setParams] = useState({ 'limit': '32', 'offset': '0', 'sort': '0', 'optn': '0', 'pr': '0', 'df': '0' })

    const fbChange = (data: { sort: number, optn: number, pr: number, df: number }) => {
        const newParams = {
            'limit': '32', 'offset': '0',
            'sort': String(data.sort), 'optn': String(data.optn),
            'pr': String(data.pr), 'df': String(data.df)
        }
        if (JSON.stringify(params) !== JSON.stringify(newParams))
            console.log(params, newParams);
            
    }

    useEffect(() => {
        setLoading(true)
        fetch('/api/data/store?' + new URLSearchParams(params), { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setStoreData(data.data)
                setLoading(false)
            })
    }, [params])

    if (isLoading) return (
        <div className={poppins.className}>
            <Navbar />
            <Loading />
        </div>
    )

    return (
        <div className={poppins.className}>
            <Navbar />
            <Categories />
            <div className={styles.container_main}>
                <div className={styles.sidebar}>
                    <Filterbar onChange={fbChange} />
                </div>
                <div className={styles.main}>
                    <Stores data={storeData} />
                </div>
            </div>
        </div>
    )
}

export default Food