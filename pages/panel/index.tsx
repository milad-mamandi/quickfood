import { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import styles from "../../styles/Panel.module.css"
import { Dosis, Poppins } from "@next/font/google";
import { BiStoreAlt, BiCoinStack } from 'react-icons/bi'
import { MdFastfood, MdExitToApp } from 'react-icons/md'
import PanelInput from "../../components/UI/PanelInput";
import Image from "next/image";
import { AiFillPicture } from "react-icons/ai";

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
    const [data, setData] = useState<dataType>(initialData)
    const [isLoading, setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState<File>()
    const [selectedImage, setSelectedImage] = useState('')

    useEffect(() => {
        if (ctx.isAdmin) {
            setLoading(true)
            fetch('/api/panel?email=' + ctx.email, { method: 'GET' })
                .then(res => res.json())
                .then((payload) => {
                    setData(payload.data.store)
                })
                .then(() => setLoading(false))
        }
    }, [ctx.isAdmin])

    return (
        <div className={`${styles.container_main} ${poppins.className}`}>
            <div className={styles.container_sidebar}>
                <Link href='/'><p className={`${dosis.className} ${styles.logo}`}>Quick<b className={styles.bold}>Food</b></p></Link>
                <ul className={styles.list}>
                    <li><BiStoreAlt /> Store</li>
                    <li><MdFastfood /> Foods</li>
                    <li><BiCoinStack /> Orders</li>
                    <li><MdExitToApp /> Log Out</li>
                </ul>
            </div>
            <div className={styles.container_panel}>
                {!isLoading &&
                    <div className={styles.container_store}>
                        <div className={styles.store_picture}>
                            <Image src={selectedImage === '' ? ('/images/store/' + data.id + '.jpg') : selectedImage} alt='store picture' width={600} height={250} style={{ objectFit: 'cover' }} />
                            <input type='file' id='inputImage' accept='image/jpeg' onChange={({ target }) => {
                                if (target.files){
                                    setSelectedImage(URL.createObjectURL(target.files[0]))
                                    setSelectedFile(target.files[0])
                                }
                            }} />
                            <label htmlFor='inputImage' className={styles.overlay}>
                                <AiFillPicture />
                            </label>
                        </div>
                        <div className={styles.store_inputs}>
                            <div className={styles.store_inputrow}>
                                <label>Name</label>
                                <PanelInput type="text" value={data.name} icon={0} />
                            </div>
                            <div className={styles.store_inputrow}>
                                <label>Address</label>
                                <PanelInput type="text" value={data.address} icon={1} />
                            </div>
                            <div className={styles.store_inputrow}>
                                <label>Delivery Fee</label>
                                <PanelInput type="number" value={data.delivery_fee.toString() + '$'} icon={2} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


export default Panel