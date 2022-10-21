import { useState } from 'react';
import { MapContainer, FeatureGroup, TileLayer, Marker, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import useEditMap from '../../hooks/useEditMap';
import { MapLayerT, MapLayerApiT } from '../../types/MapLayerT';
import styles from './Map.module.scss';

const dataFromApi = [
  {
    name: 'test',
    container_id: 'place1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    latlngs: [
      { lat: 2.1084763939094078, lng: -6.526403944101136 },
      { lat: 3.514265730212766, lng: -6.526403944101136 },
      { lat: 3.514265730212766, lng: -4.811379405376161 },
      { lat: 2.1084763939094078, lng: -4.811379405376161 },
    ],
  },
  {
    name: '123123sdafsdf',
    container_id: 'place2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    latlngs: [
      { lat: 1.3400575447762981, lng: 4.338314447148083 },
      { lat: 3.469405155187203, lng: 4.338314447148083 },
      { lat: 3.469405155187203, lng: 6.535547953728119 },
      { lat: 1.3400575447762981, lng: 6.535547953728119 },
    ],
  },
  {
    name: 'sdfsdfsdf',
    container_id: 'place3',
    description: '',
    latlngs: [
      { lat: -3.4697090278990825, lng: -6.537991410423057 },
      { lat: -1.252493779263844, lng: -6.537991410423057 },
      { lat: -1.252493779263844, lng: -2.934528459631812 },
      { lat: -3.4697090278990825, lng: -2.934528459631812 },
    ],
  },
  {
    name: 'sdfsdfsd',
    container_id: 'place4',
    description: 'Lorem ipsum',
    latlngs: [
      { lat: -3.425843258931504, lng: 3.8549230757005053 },
      { lat: -1.1865907497561037, lng: 3.8549230757005053 },
      { lat: -1.1865907497561037, lng: 6.55752028879392 },
      { lat: -3.425843258931504, lng: 6.55752028879392 },
    ],
  },
];

const Map = ({
  data = dataFromApi,
  selectedContainerId,
  mapImg,
  isEditable = false,
}: {
  data?: MapLayerApiT[];
  selectedContainerId?: string | null;
  mapImg: string;
  isEditable?: boolean;
}) => {
  const { mapRef, mapLayers, selectedContainer, setSelectedContainer, _onCreate, _onEdited, _onDeleted, _onMapReady } =
    useEditMap(data, mapImg);

  return (
    <>
      <div className="row">
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
      </div>
    </>
  );
};

export default Map;
