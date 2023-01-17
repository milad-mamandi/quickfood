import { NextPage } from "next";
import { useRouter } from 'next/router'
import styles from "../../styles/Store.module.css"
import { Poppins } from "@next/font/google";
import Navbar from "../../components/Food/Navbar";
import NotFound from "../../components/Food/NotFound";
const poppins = Poppins({ weight: '400' });

const Store: NextPage = () => {
    const router = useRouter()
    const { sid } = router.query
    if (!sid) return (
        <>
            <Navbar />
            <NotFound />
        </>
    )
    return (
        <div className={poppins.className}>
            <Navbar />
            <div className={styles.container_header}>
                <div className={styles.header_pic}> 

                </div>
                <div className={styles.header_info}>

                </div>
            </div>
            <div className={styles.container_main}>
                <div className={styles.container_sidebar}>

                </div>
                <div className={styles.container_menu}>

                </div>
            </div>
        </div>
    )
}

export default Store