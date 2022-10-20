import styles from './ItemTile.module.scss';
import { MdArrowForwardIos } from 'react-icons/md';
import { ItemTilePropsT } from '../../../types/ItemTileT';
import { Link } from 'react-router-dom';

const ItemTile = ({ title, description, imgUrl, itemData }: ItemTilePropsT) => {
  const { item_id, container_id } = itemData;
  return (
    <Link to={`user/mapSearch?container_id=${container_id}&item_id=${item_id}`} className={styles.wrapper}>
      <img src={imgUrl} alt="Item picture" className={styles.picture} />
      <span className={styles.text}>
        <h4>{title}</h4>
        <h5>{description}</h5>
      </span>
      <MdArrowForwardIos className={styles.arrow} />
    </Link>
  );
};

export default ItemTile;
