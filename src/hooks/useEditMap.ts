import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapLayerT, MapLayerApiT } from '../types/MapLayerT';
import { SelectItemT } from '../types/SelectItemT';
import { DrawEvents } from 'leaflet';
import mapImg from './map.png';
import { LatLngBounds } from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const useEditMap = (data: MapLayerApiT[]) => {
  const [mapLayers, setMapLayers] = useState<MapLayerT[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const mapRef = useRef<any>();
  const [selectedItem, setSelectedItem] = useState<SelectItemT | null>(null);

  // adding custom img map
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
  }, [isReady]);

  // changing color of active layer

  useEffect(() => {
    mapLayers.forEach(({ shape }) => {
      shape.setStyle({
        color: '#93a6b8',
      });
    });
    if (selectedItem) {
      selectedItem.shape.setStyle({
        color: '#4286c7',
      });
    }
  }, [selectedItem]);

  // event handlers

  const _onCreate = (e: any) => {
    const { layer } = e;
    const { _leaflet_id } = layer;
    const name = prompt('Podaj nazwę') || '';
    if (!name) {
      e.target.removeLayer(layer);
      return;
    }
    layer.on('click', () => {
      setSelectedItem({
        id: _leaflet_id,
        name,
        shape: layer,
      });
    });
    setSelectedItem({
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
      setSelectedItem(null);
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  const _onMapReady = (featureGroup: any) => {
    if (mapLayers.length === 0 && !isReady) {
      const layers = data.map(({ container_id, latlngs, name }) => {
        const shape = L.rectangle(latlngs as any, {
          color: '#93a6b8',
          weight: 2,
        }).addTo(featureGroup) as any;

        shape.on('click', () => {
          setSelectedItem({ id: shape._leaflet_id, name, shape });
        });

        return {
          id: shape._leaflet_id,
          container_id,
          latlngs: shape.getLatLngs()[0],
          name,
          shape,
        };
      });
      setIsReady(true);
      setMapLayers([...layers]);
    }
  };

  return {
    mapRef,
    mapLayers,
    selectedItem,
    setSelectedItem,
    _onCreate,
    _onEdited,
    _onDeleted,
    _onMapReady,
  };
};

export default useEditMap;
