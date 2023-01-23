import { NextPage } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Home/Navbar'
import Header from '../components/Home/Header'
import Searchbar from '../components/UI/Searchbar'
import SaladPic from '../public/images/home/salad.webp'
import TexturePic from '../public/images/home/texture.webp'
import PeppersPic from '../public/images/home/peppers.png'
import TomatoesPic from '../public/images/home/tomatoes.png'
import LeafPic from '../public/images/home/leaf.png'
import { Poppins } from '@next/font/google'
import { useContext } from 'react'
import AuthContext from '../context/auth-context'

const poppins = Poppins({ weight: '400' });

const Home: NextPage = () => {
  const ctx = useContext(AuthContext)

  return (
    <div>
      <Head>
        <title>QuickFood</title>
        <meta name='description' content='Fastest food delivery in Tehran' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.container_main}>
          <div className={styles.container_pics}>
            <Image src={PeppersPic} width={200} height={200} alt='A picture of peppers' className={styles.peppers_pic} />
            <Image src={TomatoesPic} width={200} height={200} alt='A picture of peppers' className={styles.tomatoes_pic} />
            <Image src={LeafPic} width={200} height={200} alt='A picture of peppers' className={styles.leaf_pic} />
            <Image src={SaladPic} width={650} height={650} alt='A picture of a salad' className={styles.salad_pic} />
            <Image src={TexturePic} width={1000} height={1000} alt='A picture of a table' className={styles.table_pic} />
          </div>
          <div className={styles.container_data}>
            <Navbar />
            <div className={styles.container_content}>
              <Header />
              <Searchbar placeholder='Enter your delivery' />
              <div className={`${styles.auth_text} ${poppins.className}`}>
                <a href='#' className={styles.link}>Log in</a> to save your location. Don't have an account? <a href='#' className={styles.link}>Sign up here</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home