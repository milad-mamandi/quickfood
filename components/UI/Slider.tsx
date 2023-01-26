import { FC } from 'react'
import styles from './Slider.module.css'

interface porpsType {
    onChange: (value: number) => void
}

const Slider: FC<porpsType> = (props) => {
    return (
        <div className={styles.container_slider}>
            <input type="radio" name="fee-amount" id="1" value="1" required onClick={() => props.onChange(1)} />
            <label htmlFor="1" data-fee-amount="< $1"></label>
            <input type="radio" name="fee-amount" id="2" value="2" required onClick={() => props.onChange(2)}/>
            <label htmlFor="2" data-fee-amount="$1-$3"></label>
            <input type="radio" name="fee-amount" id="3" value="3" required onClick={() => props.onChange(3)}/>
            <label htmlFor="3" data-fee-amount="$3-$5"></label>
            <input type="radio" name="fee-amount" id="4" value="4" required onClick={() => props.onChange(4)}/>
            <label htmlFor="4" data-fee-amount="$5+"></label>
            <div className={styles.pos}></div>
        </div>
    )
}

export default Slider