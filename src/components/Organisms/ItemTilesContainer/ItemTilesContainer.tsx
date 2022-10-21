import ItemTile from '../../Atoms/ItemTile/ItemTile';
import { useGetAllItemsQuery } from '../../../features/api/itemApiSlice';

const ItemTilesContainer = () => {
  const { data, error, isLoading, isError, isSuccess } = useGetAllItemsQuery();
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {JSON.stringify(error)}</div>}
      {isSuccess && data?.map((data) => <ItemTile key={data.id} data={data} />)}
    </div>
  );
};

export default ItemTilesContainer;
