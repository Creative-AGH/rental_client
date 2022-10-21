import styles from './ItemTile.module.scss';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GetItem } from '../../../types/GetItemT';

const ItemTile = ({ data }: { data: GetItem }) => {
  const { name, description, id, statusOfItem, categories } = data;
  console.log(data);
  return (
    <Link to={`/mapSearch?item_id=${id}`} className={styles.wrapper}>
      <img src={'https://i.pravatar.cc/72'} alt="Item picture" className={styles.picture} />
      <span className={styles.text}>
        <h4>{name}</h4>
        <h5>{description}</h5>
        <p>
          {statusOfItem} <br /> {categories.map((category) => category.categoryName).join(', ')}
        </p>
      </span>
      <MdArrowForwardIos className={styles.arrow} />
    </Link>
  );
};

export default ItemTile;
