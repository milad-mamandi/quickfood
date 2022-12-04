import { FC } from 'react'
import styles from '../../styles/Home.module.css'
import { Dosis, Poppins } from '@next/font/google'
import { FiLogIn } from 'react-icons/fi'
import { FaUserEdit } from 'react-icons/fa'
import Link from 'next/link'

const dosis = Dosis();
const poppins = Poppins({ weight: '400' });

const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link href='/'><p className={`${dosis.className} ${styles.logo}`}>Quick<b className={styles.bold}>Food</b></p></Link>
            <ul className={`${poppins.className} ${styles.nav_ul}`}>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>Restaruants</a></li>
                <li><a href='#'>Services</a></li>
            </ul>
            <div className={styles.auth_container}>
                <Link href='/signup'><button className={`${styles.button} ${styles.button_signup}`}><FaUserEdit /> Sign up</button></Link>
                <Link href='/login'><button className={`${styles.button} ${styles.button_login}`}><FiLogIn /> Log in</button></Link>
            </div>
        </nav>
    )
}

export default Navbar