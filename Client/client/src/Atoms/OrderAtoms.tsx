import { atom } from "jotai";
import { Customer } from "./CustomerAtom";
import { Paper } from "./PaperListAtom";

export let OrderAtom = atom<Order[]>([]);
export let OrderEntryAtom = atom<OrderEntry[]>([]);

export interface Order{
    id: number,
    orderDate: Date,
    deliveryDate: Date,
    status: string,
    totalAmount: number,
    customerId: number,
    customer: Customer
}

export interface OrderEntry{
    id: number,
    quantity: number,
    productId: number,
    orderId: number,
    product: Paper,
    order: Order
}