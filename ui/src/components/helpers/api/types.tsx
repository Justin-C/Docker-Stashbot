export type Item = {
  itemName: string;
  itemLocation: string;
};
export type FindItemsResponse = {
  foundItems: Item[];
};

export type GetHoldsResponse = Item[];
