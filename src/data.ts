import { ChartItem, Item, Review } from "./interfaces";

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
