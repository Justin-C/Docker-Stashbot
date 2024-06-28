import { fetchApi } from './fetch';
import { FindItemsResponse, GetHoldsResponse } from './types';

const basePath = `http://${window.location.hostname}:8080`;
export const fetchFindItems = (
  itemName: string,
): Promise<FindItemsResponse> => {
  return fetchApi(`${basePath}/stashbot/findItems`, {
    body: { itemName },
  });
};

export const fetchAddItem = (itemName: string, location: string) => {
  return fetchApi(`${basePath}/stashbot/additem`, {
    body: { itemName, location },
  });
};

export const fetchDeleteItem = (itemName: string) => {
  return fetchApi(`${basePath}/stashbot/removeitem`, {
    body: { itemName },
  });
};

export const fetchAddBin = () => {
  return fetchApi(`${basePath}/stashbot/addbin`);
};

export const fetchMoveItem = (itemName: string, location: string) => {};

export const fetchHoldItem = (itemName: string) => {
  return fetchApi(`${basePath}/stashbot/holditem`, {
    body: { itemName },
  });
};

export const fetchGetHolds = (): Promise<GetHoldsResponse> => {
  return fetchApi(`${basePath}/stashbot/getholds`, { method: 'GET' });
};

export const fetchRemoveHold = (itemName: string) => {
  return fetchApi(`${basePath}/stashbot/removehold`, {
    body: { itemName },
  });
};
