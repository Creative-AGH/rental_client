import styles from './ToggleButton.module.scss'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { toggleButtonT } from '../../../types/ThemeT';

const ToggleButton = ({ onClick }: toggleButtonT) => {
    return (
        <div className={styles.darkmode} >
            <input type="checkbox" className={styles.checkbox} onClick={onClick} />
            <label htmlFor="checkbox" className={styles.label} >
                <BsFillMoonFill />
                <BsFillSunFill />
                <div className={styles.ball}></div>
            </label>
        </div>
    );
};

export default ToggleButton;