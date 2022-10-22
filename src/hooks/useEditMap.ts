import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { LatLngBounds } from 'leaflet';
import { MapLayerT } from '../types/MapLayerT';
import { SelectItemT } from '../types/SelectItemT';
import { GetPlaceT } from '../types/ApiTypes';
import editPlace from '../utils/editPlace';
import deletePlace from '../utils/deletePlace';
import initializeMap from '../utils/initializeMap';
import createNewPlace from '../utils/createNewPlace';
import { MAP_COLORS } from '../constants/mapColors';

const useEditMap = (data: GetPlaceT[] | undefined, mapImg: string) => {
  const [mapLayers, setMapLayers] = useState<MapLayerT[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false); // is map initialized and ready to be edited
  const [selectedContainer, setSelectedContainer] = useState<SelectItemT | null>(null);
  const responseRef = useRef<any>(null);
  const mapRef = useRef<any>();

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
        color: MAP_COLORS.unSelected,
      });
    });
    if (selectedContainer) {
      selectedContainer.shape.setStyle({
        color: MAP_COLORS.selected,
      });
    }
  }, [selectedContainer]);

  // event handlers

  const _onCreate = async (e: any) => createNewPlace({ e, responseRef, setSelectedContainer, setMapLayers });

  const _onEdited = (e: any) => editPlace(e, setMapLayers);

  const _onDeleted = (e: any) => deletePlace(e, setMapLayers, setSelectedContainer);

  const _onMapReady = (featureGroup: any, selectedContainerId?: string | null) =>
    initializeMap({
      featureGroup,
      selectedContainerId,
      mapLayers,
      isReady,
      data,
      setSelectedContainer,
      setMapLayers,
      setIsReady,
    });

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
