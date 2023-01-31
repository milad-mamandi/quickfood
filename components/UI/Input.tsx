import { useState, forwardRef } from 'react';
import styles from './Input.module.css'
interface propsType {
    type: string,
    name: string,
    placeHolder: string,
    inline?: boolean,
    invalid?: boolean,
    onChange?: Function
}
type Ref = HTMLInputElement;

const Input = forwardRef<Ref, propsType>((props, ref) => {
    const [changed, setChanged] = useState(false);
    const [value, setValue] = useState('');

    let invalid = false;
    if (changed) {
        if (props.invalid || !value) invalid = true;
    }

    return (
        <div className={styles.container_input}>
            <label className={styles.label}>{props.name}</label>
            {props.inline ? <span className='spacer _16' style={{ display: 'inline-block' }} /> : <br />}
            <input className={`${styles.input} ${invalid && styles.invalid}`}
                ref={ref}
                type={props.type}
                placeholder={props.placeHolder}
                onChange={e => {
                    setValue(e.target.value);
                    props.onChange ? props.onChange({ type: props.name, payload: e.target.value }) : null;
                }}
                onBlur={() => setChanged(true)}
            />
        </div>
    )
})

export default Input