import Map from '../Map';
import mapImg from './map.png';
import { selectItemById } from '../../api/itemApiSlice';
import { useAppSelector } from '../../../app/hooks';
import { GetItem } from '../../../types/ApiTypes';
import { useParams } from 'react-router-dom';
import { useGetItemsByPlaceIdQuery } from '../../api/itemApiSlice';
import ItemTile from './ItemTile/ItemTile';

const MapSearch = () => {
  const { itemid } = useParams<{ itemid: string }>();
  const item = useAppSelector((state) => selectItemById(state, itemid || '') as GetItem);
  const { place_id } = useAppSelector((state) => state.map.selectedContainer);

  if (!item) return <div>Nie znaleziono przedmiotu</div>;

  return (
    <>
      <div>{item && <Map selectedContainerId={item.place ? item.place.id : ''} mapImg={mapImg} />}</div>
      {place_id && <PlaceItems place_id={place_id} />}
    </>
  );
};

const PlaceItems = ({ place_id }: { place_id: string }) => {
  const { data, isError, isLoading, isSuccess, error } = useGetItemsByPlaceIdQuery(place_id);
  console.log('selected', place_id);
  console.log('data', data);

  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isSuccess) {
    return (
      <div>
        <h4>W tym miejscu znajdują się:</h4>
        {data?.map((item) => (
          <ItemTile key={item.id} id={item.id} />
        ))}
      </div>
    );
  }
  return <div>Brak przedmiotów</div>;
};

export default MapSearch;
