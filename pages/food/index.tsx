import { NextPage } from "next";
import styles from '../../styles/Food.module.css'
import Navbar from "../../components/Food/Navbar";
import Loading from "../../components/Food/Loading";
import Categories from "../../components/Food/Categories";
import Filterbar from "../../components/Food/Filterbar";
import Stores from "../../components/Food/Stores";
import { Poppins } from "@next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const poppins = Poppins({ weight: '400' });

const Food: NextPage = () => {
    const router = useRouter()
    const [isLoading, setLoading] = useState(true)
    const [storeData, setStoreData] = useState([])
    const { sort, optn, pr, df, cat } = router.query

    const fbChange = (data: { sort: number, optn: number, pr: number, df: number }) => {
        if ((data.sort + data.optn + data.pr + data.df) > 0)
            router.push({
                pathname: '/food', query: {
                    ...(data.sort ? { sort: data.sort } : {}),
                    ...(data.optn ? { optn: data.optn } : {}),
                    ...(data.pr ? { pr: data.pr } : {}),
                    ...(data.df ? { df: data.df } : {}),
                    ...(cat ? {cat} : {})
                }
            })
    }
    const categoryChange = (cat : string) => {
        router.push({
            pathname : router.pathname, query : {...(cat ? {cat} : {})}
        })
    }
    useEffect(() => {
        const params = {
            'limit': '32',
            'offset': '0',
            'sort': sort?.toString() ?? '0',
            'optn': optn?.toString() ?? '0',
            'pr': pr?.toString() ?? '0',
            'df': df?.toString() ?? '0',
            'cat': cat?.toString() ?? 'none'
        }
        console.log(params);
        
        fetch('/api/data/store?' + new URLSearchParams(params), { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setStoreData(data.data)
                setLoading(false)
            })
    }, [sort, optn, pr, df, cat])

    if (isLoading) return (
        <div className={poppins.className}>
            <Navbar />
            <Loading />
        </div>
    )

    return (
        <div className={poppins.className}>
            <Navbar />
            <Categories onClick={categoryChange}/>
            <div className={styles.container_main}>
                <div className={styles.sidebar}>
                    <Filterbar onChange={fbChange} data={{ sort: Number(sort) || 0, optn: Number(optn) || 0, pr: Number(pr) || 0, df: Number(df) || 0 }} />
                </div>
                <div className={styles.main}>
                    <Stores data={storeData} />
                </div>
            </div>
        </div>
    )
}

export default Food