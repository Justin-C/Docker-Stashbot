export type Item = {
  itemName: string;
  location: string;
};
export type FindItemsResponse = {
  foundItems: Item[];
};

export type GetHoldsResponse = Item[];
