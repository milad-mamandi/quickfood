import styles from "./Searchbar.module.css"
import { FC, useRef, useState } from "react";
import { FiSearch } from 'react-icons/fi'
import { CgSpinnerAlt } from 'react-icons/cg'
import { Poppins } from '@next/font/google'

interface SearchResult {
    key: number;
    title: string,
    address: string
}
interface propsType {
    placeholder : string,
}

const ExampleData = [{
    key: 1,
    title: "Daizu Cafe",
    address: "Rangoon Road, Singapore"
}, {
    key: 2,
    title: "Daizu Cafe",
    address: "Rangoon Road, Singapore"
}, {
    key: 3,
    title: "Daizu Cafe",
    address: "Rangoon Road, Singapore"
}]

const poppins = Poppins({ weight: '400' });

const ListItem = (props: SearchResult) => {
    return (
        <div className={styles.item_container}>
            <div className={styles.icon_container}>
                <FiSearch
                    className={styles.list_icon}
                />
            </div>
            <div className={styles.location_container}>
                <p className={styles.p_title}>{props.title}</p>
                <p className={styles.p_address}>{props.address}</p>
            </div>
        </div>
    )
}

const SearchLocation : FC<propsType> = (props) => {
    const [location, setLocation] = useState("");
    const focusRef = useRef<HTMLInputElement>(null);

    const handleChange = (value: string) => {
        setLocation(value);
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }

    return (
        <div className={`${styles.container} ${poppins.className}`}>
            <div className={styles.container_main}>
                <div className={styles.container_searchbox}>
                    {location ? <CgSpinnerAlt className={`${styles.main_icon} ${styles.icon_spin}`} /> :
                        <FiSearch className={styles.main_icon} />}
                    <div className="spacer _24" />
                    <input type="text" id="sreach_location_text" className={styles.input_text} placeholder={props.placeholder}
                        autoComplete="off" value={location} onChange={e => handleChange(e.target.value)} ref={focusRef} />
                    <input type="button" id="search_location_clear" className={styles.input_clear} value="Clear"
                        onClick={() => handleChange("")} style={{ display: !location ? "none" : "block" }} />
                </div>
                <ul className={styles.result_list} style={{ display: location ? "block" : "none" }}>
                    {ExampleData.map((data) => {
                        return <li key={data.key}><ListItem {...data} /></li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default SearchLocation