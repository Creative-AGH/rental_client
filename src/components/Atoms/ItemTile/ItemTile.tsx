import styles from './ItemTile.module.scss'
import { MdArrowForwardIos } from 'react-icons/md'
import { ItemTilePropsT } from '../../../types/ItemTileT'

const ItemTile = ({ title, description, url }: ItemTilePropsT) => {
    return (
        <div className={styles.wrapper}>
            <img src={url} alt="Item picture" className={styles.picture} />
            <span className={styles.text}>
                <h4>{title}</h4>
                <h5>{description}</h5>
            </span>
            <MdArrowForwardIos className={styles.arrow} />
        </div>
    )
}

export default ItemTile