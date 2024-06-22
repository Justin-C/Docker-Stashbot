import { fetchApi } from './fetch';
import { FindItemsResponse } from './types';

export const fetchFindItems = (
  itemName: string,
): Promise<FindItemsResponse> => {
  return fetchApi(`http://${window.location.hostname}:8080/stashbot/findItems`, {
    body: { itemName },
  });
};

export const fetchAddItem = (itemName: string, location: string) => {
  return fetchApi(`http://${window.location.hostname}:8080/stashbot/additem`, {
    body: { itemName, location },
  });
};

export const fetchDeleteItem = (itemName: string) => {};

export const fetchAddBin = () => {};

export const fetchMoveItem = (itemName: string, location: string) => {

}
