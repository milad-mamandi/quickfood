import { FC } from 'react'
import styles from './Categories.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface propsType {
    onClick : (cat : string) => void
}

const categories = [
    {name : 'Pizza', id : 'clc84aqka000avdc8r1cr3wv8'},
    {name : 'French Fries', id : 'none'},
    {name : 'Burger', id : 'clc84aqka0008vdc8l9xdb0x2'},
    {name : 'Breakfast', id : 'none'},
    {name : 'Donut', id : 'none'},
    {name : 'Fried Chicken', id : 'clc84e6re000ivdc88l2w00n5'},
]

const Categories: FC<propsType> = (props) => {
    return (
        <nav className={styles.container_main}>
            <ul className={styles.container_list}>
                {categories.map((cat, index) => {
                    const item = cat.name.replace(' ', '-').toLowerCase()
                    return (
                        <li className={styles.container_item} key={index} onClick={() => props.onClick(cat.id)}>
                                <Image className={styles.picture}
                                src={`/images/categories/${item}.png`}
                                    alt={item} width={64} height={64}/>
                                <span className={styles.text}>{cat.name}</span>
                        </li>
                    )
                })}
            </ul>
            <hr className={styles.hrline}/>
        </nav>
    )
}

export default Categories