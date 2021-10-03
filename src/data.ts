import { Item } from "./controllers/item";
import { ChartItem } from "./controllers/chart";
import { Order } from "./controllers/order";

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