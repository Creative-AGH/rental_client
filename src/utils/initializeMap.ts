import { Dispatch, SetStateAction } from 'react';
import { MapLayerT } from '../types/MapLayerT';
import { GetPlaceT } from '../types/ApiTypes';
import { SelectItemT } from '../types/SelectItemT';
import L from 'leaflet';
import { MAP_COLORS } from '../constants/mapColors';

interface OwnProps {
  featureGroup: any;
  selectedContainerId?: string | null;
  mapLayers: MapLayerT[];
  isReady: boolean;
  data: GetPlaceT[] | undefined;
  setSelectedContainer: Dispatch<SetStateAction<SelectItemT | null>>;
  setMapLayers: Dispatch<SetStateAction<MapLayerT[]>>;
  setIsReady: Dispatch<SetStateAction<boolean>>;
}

const initializeMap = ({
  featureGroup,
  mapLayers,
  isReady,
  data,
  selectedContainerId,
  setSelectedContainer,
  setMapLayers,
  setIsReady,
}: OwnProps) => {
  // adding layers from data
  if (mapLayers.length === 0 && !isReady && data) {
    const layers = data
      .filter(
        //filtering out layers with no coordinates
        (d) => d.latlngs.length > 0
      )
      .map(({ id, latlngs, name, description }) => {
        const shape = L.rectangle(latlngs as any, {
          color: MAP_COLORS.unSelected,
          weight: 2,
        }).addTo(featureGroup) as any;

        // adding event listener to the shape
        !selectedContainerId &&
          shape.on('click', () => {
            setSelectedContainer({ id: shape._leaflet_id, name, shape, container_id: id });
          });

        !selectedContainerId && description && shape.bindPopup(description);

        return {
          id: shape._leaflet_id,
          container_id: id,
          latlngs: shape.getLatLngs()[0],
          name,
          shape,
        };
      });

    // delete layer where latlngs is empty
    // if there is a selected container on start, select it
    if (selectedContainerId) {
      const selectedLayer = layers.find(({ container_id }) => container_id === selectedContainerId);
      if (selectedLayer) {
        selectedLayer.shape.bindPopup(`Przedmiot znajduje się w tej szafce`);
        delete selectedLayer.latlngs;
        setSelectedContainer(selectedLayer);
      }
    }
    setIsReady(true);
    setMapLayers([...layers]);
  }
};

export default initializeMap;
