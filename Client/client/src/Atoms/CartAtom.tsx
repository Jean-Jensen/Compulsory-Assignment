import { atom } from "jotai";
// @ts-ignore
import { Paper } from "./PaperListAtom";
import { Customer} from "./CustomerAtom";
// @ts-ignore
import {Order, OrderEntry} from "./OrderAtoms";


export let cartAtom = atom<OrderEntryDto[]>([]);
export let cartQuantityAtom = atom<number[]>([]); //not sure if I'll use this one but it's here just in case

export let chosenCustomer = atom<Customer>();

export interface OrderEntryDto{
    quantity: number,
    productId: number
}

export interface OrderDto{
    orderDate: Date,
    deliveryDate: Date,
    status: string,
    totalAmount: number,
    customerId: number
}