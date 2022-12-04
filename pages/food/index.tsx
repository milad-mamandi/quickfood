import { NextPage } from "next";
import Navbar from "../../components/Food/Navbar";
import Categories from "../../components/Food/Categories";
import Filterbar from "../../components/Food/Filterbar";
import { Poppins } from "@next/font/google";
const poppins = Poppins({ weight: '400' });

const Food = () => {
    return (
        <div className={poppins.className}>
            <Navbar />
            <Categories />
            <Filterbar />
        </div>
    )
}

export default Food