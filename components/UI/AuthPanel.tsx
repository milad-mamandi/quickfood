import Link from 'next/link';
import { FC, useContext } from 'react'
import AuthContext from '../../context/auth-context'
import styles from './AuthPanel.module.css'
import { FaUser } from 'react-icons/fa'
import { Poppins } from '@next/font/google';

const AuthPanel: FC = () => {
    const ctx = useContext(AuthContext);

    if (ctx.isLogged) {
        return (
        <div className={styles.container_main}>
            <Link href='/panel' className={styles.button_panel}>
                Store Panel
            </Link>
            <button className={styles.button} onClick={() => ctx.logout()}>
                Log out
            </button>
        </div>
        )
    }
    return (
        <div className={styles.container_main}>
            <Link href='/login' className={styles.button}>
                <FaUser className={styles.icon} />
                Login
            </Link>
            <Link href='/signup' className={styles.button}>
                Signup
            </Link>
        </div>
    )
}

export default AuthPanel