import { LatLng } from 'leaflet';

export interface MapLayerApiT {
  id?: number;
  container_id?: number;
  latlngs:
    | {
        lat: number;
        lng: number;
      }[]
    | LatLng
    | LatLng[]
    | LatLng[][];
  name: string;
  shape?: any;
}

export interface MapLayerT extends MapLayerApiT {
  id: number;
}
