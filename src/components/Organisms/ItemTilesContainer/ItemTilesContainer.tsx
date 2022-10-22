import ItemTile from '../../Atoms/ItemTile/ItemTile';
import { useGetAllItemsQuery } from '../../../features/api/itemApiSlice';
import { selectItemIds } from '../../../features/api/itemApiSlice';
import { useSelector } from 'react-redux';

const ItemTilesContainer = () => {
  const { error, isLoading, isError, isSuccess } = useGetAllItemsQuery();

  const itemIds = useSelector(selectItemIds);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {JSON.stringify(error)}</div>}
      {isSuccess && itemIds.map((id) => <ItemTile key={id} id={id.toString()} />)}
    </div>
  );
};

export default ItemTilesContainer;
