import { FC } from "react";
import styles from './Strengthbar.module.css'

interface propsInterface {
    progress: number;
}


const Progressbar: FC<propsInterface> = (props) => {
    let fillStyle;
    switch (props.progress) {
        case 1:
            fillStyle = styles.red;
            break;
        case 2:
            fillStyle = styles.orange;
            break;
        case 3:
            fillStyle = styles.lime;
            break;
        case 4:
            fillStyle = styles.green;
            break;
    }
    return (
        <div className={styles.container_bars}>
            <span className={`${styles.bar} ${props.progress >= 1 && fillStyle}`} />
            <span className={`${styles.bar} ${props.progress >= 2 && fillStyle}`} />
            <span className={`${styles.bar} ${props.progress >= 3 && fillStyle}`} />
            <span className={`${styles.bar} ${props.progress >= 4 && fillStyle}`} />
        </div>
    )
}

export default Progressbar;