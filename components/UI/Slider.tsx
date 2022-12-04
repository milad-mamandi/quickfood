import { FC } from 'react'
import styles from './Slider.module.css'

const Slider: FC = () => {
    return (
        <div className={styles.container_slider}>
            <input type="radio" name="fee-amount" id="1" value="1" required />
            <label htmlFor="1" data-fee-amount="< $1"></label>
            <input type="radio" name="fee-amount" id="2" value="2" required />
            <label htmlFor="2" data-fee-amount="$1-$3"></label>
            <input type="radio" name="fee-amount" id="3" value="3" required />
            <label htmlFor="3" data-fee-amount="$3-$5"></label>
            <input type="radio" name="fee-amount" id="4" value="4" required />
            <label htmlFor="4" data-fee-amount="$5+"></label>
            <div className={styles.pos}></div>
        </div>
    )
}

export default Slider