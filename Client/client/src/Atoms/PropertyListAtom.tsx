import {atom} from "jotai/index";

// @ts-ignore
export let propertyListAtom : Property[]= atom<Property[]>([])

export interface Property {
    id: number,
    propertyName: string
}