import { FC } from 'react'
import styles from './Categories.module.css'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
    'Pizza',
    'French fries',
    'Burger',
    'Breakfast',
    'Donut',
    'Fried chicken',

]

const Categories: FC = () => {
    return (
        <nav className={styles.container_main}>
            <ul className={styles.container_list}>
                {categories.map((name, index) => {
                    const item = name.replace(' ', '-').toLowerCase()
                    return (
                        <li key={index}>
                            <Link className={styles.container_item} href={`/category/${item}`} >
                                <Image className={styles.picture}
                                src={`/images/categories/${item}.png`}
                                    alt={item} width={64} height={64}/>
                                <span className={styles.text}>{name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <hr className={styles.hrline}/>
        </nav>
    )
}

export default Categories