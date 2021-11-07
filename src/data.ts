import { ChartItem, Item, Order, Review } from "./interfaces";

export const items: Item[] = [
  {id: 1, label: "first item", color: "FFFFFF"},
  {id: 2, label: "second item", color: "000000"}
];

export const chart: ChartItem[] = [ 
  {id: 1, count: 1}
];

export const itemsWaitingForApproval: Item[] = [
  {id: 3, label: "second item", color: "000000"}
];

export const orders: Order[] = [
  {
    id: 1,
    address: "random address data",
    items: [{id: 1, count: 1}],
    sellerId: 5,
    state: "approved"
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    itemId: 1,
    userId: 1,
    title: "AAAA",
    date: "NOT HAPPY",
    rating: 5
  }
];
