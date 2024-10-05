import { atom } from "jotai";
import { Paper } from "./PaperListAtom";


export let cartAtom = atom<Paper[]>([]);
export let cartQuantityAtom = atom<number[]>([]); //not sure if I'll use this one but it's here just in case