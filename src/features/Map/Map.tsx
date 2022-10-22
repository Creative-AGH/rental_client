import { useState } from 'react';
import { MapContainer, FeatureGroup, TileLayer, Marker, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import useEditMap from '../../hooks/useEditMap';
import { MapLayerT, MapLayerApiT } from '../../types/MapLayerT';
import styles from './Map.module.scss';
import { useGetAllPlacesQuery } from '../api/placeApiSlice';

interface OwnProps {
  mapImg: string;
  selectedContainerId?: string;
  isEditable?: boolean;
}

const Map = ({ selectedContainerId, mapImg, isEditable = true }: OwnProps) => {
  const { data, isError, isLoading, isSuccess, error } = useGetAllPlacesQuery();

  const { mapRef, mapLayers, selectedContainer, setSelectedContainer, _onCreate, _onEdited, _onDeleted, _onMapReady } =
    useEditMap(data, mapImg);

  return (
    <>
      <div className="row">
        {isError && <div>{JSON.stringify(error)}</div>}
        {isLoading && <div>Loading...</div>}
        {isSuccess && (
          <div className="col text-center">
            <div className="col">
              <MapContainer className={styles.map} center={[0, 0]} ref={mapRef} scrollWheelZoom={false}>
                <FeatureGroup
                  ref={(ref) => {
                    if (ref) {
                      _onMapReady(ref, selectedContainerId);
                    }
                  }}>
                  {isEditable && (
                    <EditControl
                      position="topright"
                      onCreated={_onCreate}
                      onEdited={_onEdited}
                      onDeleted={_onDeleted}
                      draw={{
                        circle: false,
                        polyline: false,
                        polygon: false,
                        circlemarker: false,
                        marker: false,
                      }}
                    />
                  )}
                </FeatureGroup>
              </MapContainer>
              {/* <div style={{ border: '1px solid #f00' }}>
                <div>
                  selectedContainer:{' '}
                  {selectedContainer ? (
                    <div>
                      <div>nazwa: {selectedContainer.name}</div>
                      <div>_leaflet_id: {selectedContainer.id}</div>
                    </div>
                  ) : (
                    'Nie zaznaczono'
                  )}
                </div>
              </div>
              &#91;
              {mapLayers.map((layer: MapLayerT) => (
                <div key={layer.id}>
                  &#123;
                  <div>name: {`"${layer.name}"`},</div>
                  <div>_leaflet_id: {layer.id},</div>
                  <div>latlngs: {JSON.stringify(layer.latlngs)},</div>
                  &#125;,
                  <br />
                </div>
              ))}
              &#93; */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
