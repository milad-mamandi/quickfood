import { NextPage } from "next";
import styles from '../../styles/Food.module.css'
import Navbar from "../../components/Food/Navbar";
import Categories from "../../components/Food/Categories";
import Filterbar from "../../components/Food/Filterbar";
import Stores from "../../components/Food/Stores";
import { Poppins } from "@next/font/google";
const poppins = Poppins({ weight: '400' });

const Food = () => {
    return (
        <div className={poppins.className}>
            <Navbar />
            <Categories />
            <div className={styles.container_main}>
                <div className={styles.sidebar}>
                    <Filterbar />
                </div>
                <div className={styles.main}>
                    <Stores />
                </div>
            </div>
        </div>
    )
}

export default Food