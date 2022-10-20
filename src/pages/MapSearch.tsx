import { useSearchParams } from 'react-router-dom';
import Map from '../features/Map/Map';
import mapImg from './map.png';

const MapSearch = () => {
  const [searchParams] = useSearchParams();
  const container_id = searchParams.get('container_id');
  const item_id = searchParams.get('item_id');
  // here will be a call to redux to get the data for the map and the item
  return (
    <div>
      przedmiot o id {item_id} zanjduje się w szfce o id {container_id} w Budynku B5
      <Map selectedContainerId={Number(container_id)} mapImg={mapImg} />
    </div>
  );
};

export default MapSearch;
