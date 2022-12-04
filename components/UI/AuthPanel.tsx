import Link from 'next/link';
import { FC, useContext } from 'react'
import AuthContext from '../../context/auth-context'
import styles from './AuthPanel.module.css'
import { FaUser } from 'react-icons/fa'

const AuthPanel: FC = () => {
    const authctx = useContext(AuthContext);
    if (authctx.isLogged) {
        return (
            <>
            </>
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