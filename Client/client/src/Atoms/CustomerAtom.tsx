import { atom } from "jotai";


export let customerAtom = atom<Customer[]>([]);


export interface Customer{
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string
    
}