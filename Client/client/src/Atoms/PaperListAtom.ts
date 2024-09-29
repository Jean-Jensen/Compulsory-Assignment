import {atom} from "jotai";


// @ts-ignore
export let paperListAtom : Paper[]= atom<Paper[]>([])

export interface Paper {
    name: string,
    discontinued: boolean,
    stock: number,
    price: number
}