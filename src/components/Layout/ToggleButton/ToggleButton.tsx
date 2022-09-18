import styles from './ToggleButton.module.scss'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { toggleButtonT } from '../../../types/ThemeT';

const ToggleButton = ({ onClick }: toggleButtonT) => {
    return (
        <div id={styles.darkmode} onClick={onClick}>
            <input type="checkbox" className={styles.checkbox} id={styles.checkbox} />
            <label htmlFor="checkbox" className={styles.label}>
                <BsFillMoonFill />
                <BsFillSunFill color='white' />
                <div className={styles.ball}></div>
            </label>
        </div>
    );
};

export default ToggleButton;