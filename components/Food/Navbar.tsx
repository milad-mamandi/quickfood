import Link from 'next/link'
import { FC } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Dosis } from '@next/font/google'
import styles from './Navbar.module.css'
import Location from '../UI/Location'
import Searchbar from '../UI/Searchbar'
import Cart from '../UI/Cart'
import AuthPanel from '../UI/AuthPanel'

const dosis = Dosis();

const Navbar: FC = () => {

    return (
        <nav className={styles.container_main}>
            <div className={styles.navbar}>
                <GiHamburgerMenu className={styles.nav_icon} />
                <Link href='/'><p className={`${dosis.className} ${styles.logo}`}>
                    Quick<b className={styles.logo_secondary}>Food</b></p></Link>
                <Location location='New York' time='Now' /> 
                <span className='spacer 16'/>
                <Searchbar placeholder='Restaurants, food, drinks, etc...'/>
                <Cart itemcount={10}/>
                <AuthPanel />
            </div>
        </nav>
    )
}
export default Navbar