import { fetchApi } from "./fetch";
import { FindItemsResponse } from "./types";

export const fetchFindItems = (
  itemName: string,
): Promise<FindItemsResponse> => {
  return fetchApi("http://localhost:8080/stashbot/finditems", {
    body: { itemName },
  });
};

export const fetchAddItem = (itemName: string, location: string) => {
  return fetchApi("http://localhost:8080/stashbot/additem", {
    body: { itemName, location },
  });
};

export const fetchDeleteItem = () => {};
