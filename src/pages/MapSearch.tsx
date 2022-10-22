import Map from '../features/Map/Map';
import mapImg from './map.png';
import { selectItemById } from '../features/api/itemApiSlice';
import { useSelector } from 'react-redux';
import { GetItem } from '../types/ApiTypes';
import { useParams } from 'react-router-dom';

const MapSearch = () => {
  const { itemid } = useParams<{ itemid: string }>();
  const item = useSelector((state) => selectItemById(state, itemid || '') as GetItem);
  if (!item) return <div>Nie znaleziono przedmiotu</div>;

  return <div>{item && <Map selectedContainerId={item.place.id} mapImg={mapImg} />}</div>;
};

export default MapSearch;
