import {atom} from "jotai";


// @ts-ignore
export let paperListAtom : Paper[]= atom<Paper[]>([])

export interface Paper {
    id: number,
    name: string,
    discontinued: boolean,
    stock: number,
    price: number
}