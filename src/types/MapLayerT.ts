import { LatLng } from 'leaflet';

export interface MapLayerApiT {
  id?: number;
  container_id?: string;
  description?: string;
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
