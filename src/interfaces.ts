export interface Seller extends User {
  shopName: string;
}

export interface Review {
  id: number;
  itemId: number;
  userId: number;
  title: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface User {
  id: number;
  name: string;
  address?: string;
}

export interface Item {
  id: number;
  label: string;
  color: string;
}

export interface ChartItem {
  id: number;
  count: number
}

export type orderState = "pending" | "paid" | "approved" | "finished" | "canceled";

export interface Order {
  id: number;
  address: string;
  items: ChartItem[];
  sellerId: number;
  state: orderState;
}

export type AnyTypeOfArray = Order | ChartItem | Item | User | Review | Seller;