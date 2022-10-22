import { Dispatch, SetStateAction } from 'react';
import { MapLayerT } from '../types/MapLayerT';

const editPlace = (e: any, setMapLayers: Dispatch<SetStateAction<MapLayerT[]>>) => {
  const {
    layers: { _layers },
  } = e;

  Object.values(_layers).map(({ _leaflet_id, editing }: any) => {
    setMapLayers((layers) =>
      layers.map((l) => {
        return l.id === _leaflet_id
          ? {
              ...l,
              latlngs: [...editing._getCorners()],
            }
          : l;
      })
    );
  });
};

export default editPlace;
