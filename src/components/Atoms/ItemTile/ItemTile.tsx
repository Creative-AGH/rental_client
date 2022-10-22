import styles from './ItemTile.module.scss';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GetItem } from '../../../types/ApiTypes';
import { useSelector } from 'react-redux';
import { selectItemById } from '../../../features/api/itemApiSlice';

const ItemTile = ({ id }: { id: string }) => {
  const { name, description, statusOfItem, categories } = useSelector((state) => selectItemById(state, id) as GetItem);
  return (
    <Link to={`/mapSearch/${id}`} className={styles.wrapper}>
      <img src={'https://i.pravatar.cc/72'} alt="Item picture" className={styles.picture} />
      <span className={styles.text}>
        <h4>{name || 'Bez nazwy'}</h4>
        <h5>{description || 'Brak opisu'}</h5>
        <p>
          {statusOfItem || 'Stan nieznany'} <br />{' '}
          {categories.map((category: any) => category.categoryName).join(', ') || 'Brak kategorii'}
        </p>
      </span>
      <MdArrowForwardIos className={styles.arrow} />
    </Link>
  );
};

export default ItemTile;
