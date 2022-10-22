import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { LatLngBounds } from 'leaflet';
import { newPlaceModal } from '../components/Layout/Modal/Modal';
import { MapLayerT } from '../types/MapLayerT';
import { SelectItemT } from '../types/SelectItemT';
import { GetPlaceT } from '../types/ApiTypes';

const COLORS = {
  unSelected: '#93a6b8',
  selected: '#4286c7',
};

const useEditMap = (data: GetPlaceT[] | undefined, mapImg: string) => {
  const [mapLayers, setMapLayers] = useState<MapLayerT[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [selectedContainer, setSelectedContainer] = useState<SelectItemT | null>(null);
  const responseRef = useRef<any>(null);
  const mapRef = useRef<any>();

  const showModal = () =>
    newPlaceModal()
      .then((e) => (responseRef.current = e))
      .catch((e) => console.log(e));

  // adding custom img map and open Popup
  useEffect(() => {
    if (isReady && mapRef.current != null) {
      const img = new Image();
      img.src = mapImg;
      img.onload = () => {
        // setting the image size using its aspect ratio to fit within the map limits
        const aspectRatio = img.width / img.height;
        const multiplier = 5;
        // putting the image in the center of the map
        const bounds = new LatLngBounds(
          new L.LatLng(0 + multiplier, 0 - multiplier * aspectRatio),
          new L.LatLng(-1 * multiplier, multiplier * aspectRatio)
        );

        L.imageOverlay(mapImg, bounds).addTo(mapRef.current);
        mapRef.current.fitBounds(bounds, {
          duration: 8,
        });
      };
    }
    setTimeout(() => {
      selectedContainer && selectedContainer.shape.openPopup();
    }, 10);
  }, [isReady, mapRef.current]);

  // changing color of active layer

  useEffect(() => {
    mapLayers.forEach(({ shape }) => {
      shape.setStyle({
        color: COLORS.unSelected,
      });
    });
    if (selectedContainer) {
      selectedContainer.shape.setStyle({
        color: COLORS.selected,
      });
    }
  }, [selectedContainer]);

  // event handlers

  const _onCreate = async (e: any) => {
    const { layer } = e;
    const { _leaflet_id } = layer;

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

  const _onEdited = (e: any) => {
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

  const _onDeleted = (e: any) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }: any) => {
      setSelectedContainer(null);
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  const _onMapReady = (featureGroup: any, selectedContainerId?: string | null) => {
    // adding layers from data
    if (mapLayers.length === 0 && !isReady && data) {
      const layers = data.map(({ id, latlngs, name, description }) => {
        const shape = L.rectangle(latlngs as any, {
          color: COLORS.unSelected,
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

  return {
    mapRef,
    mapLayers,
    selectedContainer,
    setSelectedContainer,
    _onCreate,
    _onEdited,
    _onDeleted,
    _onMapReady,
  };
};

export default useEditMap;
