import { useSearchParams } from 'react-router-dom';
import Map from '../features/Map/Map';
import mapImg from './map.png';
import { useGetItemQuery } from '../features/api/itemApiSlice';

const MapSearch = () => {
  const [searchParams] = useSearchParams();
  const item_id = searchParams.get('item_id');

  const { data, error, isLoading, isError, isSuccess } = useGetItemQuery(item_id?.toString() || '');
  console.log(data);
  // here will be a call to redux to get the data for the map and the item
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {JSON.stringify(error)}</div>}
      {isSuccess && <div>Item: {JSON.stringify(data, null, 3)}</div>}
      {isSuccess && <Map selectedContainerId={data.place.id} mapImg={mapImg} />}
    </div>
  );
};

export default MapSearch;
