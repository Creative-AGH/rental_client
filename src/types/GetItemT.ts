export interface GetItem {
  borrowed_by: GetAccount;
  categories: GetCategory[];
  dateOfCreation: string;
  description: string;
  id: string;
  images?: Image[];
  name: string;
  place: GetPlace;
  statusOfItem: StatusOfItem;
}

export enum StatusOfItem {
  NEW = 'NEW',
  USED = 'USED',
  DAMAGED = 'DAMAGED',
  DESTROYED = 'DESTROYED',
  EJECTED = 'EJECTED',
}

export interface GetPlace {
  description: string;
  id: string;
  name: string;
  placeCoordinatesDto: any;
}

export interface Image {
  id: string;
  itemId: string;
  link: string;
}

export interface GetAccount {
  id: number;
  name: string;
  surname: string;
}

export interface GetCategory {
  categoryName: string;
  description: string;
  id: string;
}
