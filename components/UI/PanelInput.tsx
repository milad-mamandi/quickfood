import { ChangeEvent, FC, useRef, useState } from "react";
import { AiFillTag } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { BsPinMapFill } from "react-icons/bs";
import styles from './PanelInput.module.css'

interface propsType {
    type: string,
    value: string,
    icon : number
}

const PanelInput: FC<propsType> = (props) => {
    const [value, setValue] = useState(props.value)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.type === 'text') {
            setValue(e.target.value)
        } else {
            const result = e.target.value.replace(/[^0-9.]/g, '').replace('$', '');
            setValue(result + '$');
        }
    }
    return (
        <div className={styles.main}>
            {props.icon === 0 && <AiFillTag className={styles.icon}/>}
            {props.icon === 1 && <BsPinMapFill className={styles.icon}/>}
            {props.icon === 2 && <BiDollar className={styles.icon}/>}
            <input className={styles.input}
                type='text'
                placeholder='Enter your value here...'
                value={value}
                onChange={(e) => onChange(e)}
            />
        </div>

    )
}



export default PanelInput