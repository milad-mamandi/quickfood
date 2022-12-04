import styles from '../../styles/Home.module.css'
import { Poppins } from '@next/font/google'
import { FC } from 'react';

const poppins = Poppins({ weight: '200' });
const poppinsBold = Poppins({ weight: '700' });

const Header: FC = () => {
    return (
        <div className={`${poppins.className} ${styles.text_container}`}>
            <h1 className={`${poppinsBold.className} ${styles.text_1}`}>Order your</h1>
            <h1 className={styles.text_2}>favorite Foods</h1>
            <div className={styles.small_text}>
                <h3 className={styles.text_3}>Fresh and tasty food, delivered to you <b className={styles.bold}>ASAP!</b></h3>
                <h3 className={styles.text_3}>Enjoy your favorite food from your favorite restaruants</h3>
            </div>
        </div>
    )
}

export default Header;