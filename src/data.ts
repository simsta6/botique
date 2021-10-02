import { Item } from "./item";
import { ChartItem } from "./chart";

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