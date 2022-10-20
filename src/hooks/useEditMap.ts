import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapLayerT, MapLayerApiT } from '../types/MapLayerT';
import { SelectItemT } from '../types/SelectItemT';
import { DrawEvents } from 'leaflet';
import mapImg from './map.png';
import { LatLngBounds } from 'leaflet';

const COLORS = {
  unSelected: '#93a6b8',
  selected: '#4286c7',
};

const useEditMap = (data: MapLayerApiT[]) => {
  const [mapLayers, setMapLayers] = useState<MapLayerT[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [selectedContainer, setSelectedContainer] = useState<SelectItemT | null>(null);
  const mapRef = useRef<any>();

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

  const _onCreate = (e: any) => {
    const { layer } = e;
    const { _leaflet_id } = layer;
    const name = prompt('Podaj nazwę') || '';
    if (!name) {
      e.target.removeLayer(layer);
      return;
    }
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

  const _onMapReady = (featureGroup: any, selectedContainerId?: number) => {
    // adding layers from data
    if (mapLayers.length === 0 && !isReady) {
      const layers = data.map(({ container_id, latlngs, name }) => {
        const shape = L.rectangle(latlngs as any, {
          color: COLORS.unSelected,
          weight: 2,
        }).addTo(featureGroup) as any;

        // adding event listener to the shape
        shape.on('click', () => {
          setSelectedContainer({ id: shape._leaflet_id, name, shape, container_id });
        });

        return {
          id: shape._leaflet_id,
          container_id,
          latlngs: shape.getLatLngs()[0],
          name,
          shape,
        };
      });

      // if there is a selected container on start, select it
      if (selectedContainerId) {
        const selectedLayer = layers.find(({ container_id }) => container_id === selectedContainerId);
        selectedLayer
          ? setSelectedContainer(selectedLayer)
          : alert(`Nie znaleziono kontenera o id: ${selectedContainerId}`);
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
