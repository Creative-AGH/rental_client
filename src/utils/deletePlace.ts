import { Dispatch, SetStateAction } from 'react';
import { MapLayerT } from '../types/MapLayerT';
import { SelectItemT } from '../types/SelectItemT';

const deletePlace = (
  e: any,
  setMapLayers: Dispatch<SetStateAction<MapLayerT[]>>,
  setSelectedContainer: Dispatch<SetStateAction<SelectItemT | null>>
) => {
  const {
    layers: { _layers },
  } = e;

  Object.values(_layers).map(({ _leaflet_id }: any) => {
    setSelectedContainer(null);
    setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
  });
};

export default deletePlace;
