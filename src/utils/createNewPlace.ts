import { Dispatch, SetStateAction } from 'react';
import { SelectItemT } from '../types/SelectItemT';
import { MapLayerT } from '../types/MapLayerT';
import { newPlaceModal } from '../components/Layout/Modal/Modal';

interface OwnProps {
  e: any;
  responseRef: any;
  setSelectedContainer: Dispatch<SetStateAction<SelectItemT | null>>;
  setMapLayers: Dispatch<SetStateAction<MapLayerT[]>>;
}

const createNewPlace = async ({ e, responseRef, setSelectedContainer, setMapLayers }: OwnProps) => {
  const { layer } = e;
  const { _leaflet_id } = layer;

  const showModal = () =>
    newPlaceModal()
      .then((e) => (responseRef.current = e))
      .catch((e) => console.log(e));

  //show modal
  await showModal();
  const name = responseRef.current?.name;
  const description = responseRef.current?.description;
  responseRef.current = null;
  if (!name || !description) {
    e.target.removeLayer(layer);
    return;
  }

  layer.bindPopup(`${description}`);
  layer.on('click', () => {
    setSelectedContainer({
      id: _leaflet_id,
      name,
      shape: layer,
    });
  });
  setSelectedContainer({
    id: _leaflet_id,
    name,
    shape: layer,
  });
  setMapLayers((layers) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0], shape: layer, name }]);
};

export default createNewPlace;
