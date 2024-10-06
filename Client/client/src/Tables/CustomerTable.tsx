import {useAtom} from "jotai";
import {Customer, customerAtom } from "../Atoms/CustomerAtom";
import {MouseEventHandler, useCallback, useEffect, useState} from "react";
import { chosenCustomer } from "../Atoms/CartAtom";


type SortKey = keyof Customer

type SortOrder = "ascn" | "desn";

function CustomerTable(){
    
    // @ts-ignore
    const [sortKey, setSortKey] = useState<SortKey>("id"); //for knowing what we're sorting based on
    // @ts-ignore
    const [sortOrder, setSortOrder] = useState<SortOrder>("ascn"); //for knowing if it's ascending or descending order
    
    const [custData, setCustData] = useAtom(customerAtom);
    //const [selectedCust, setSelectedCust] = useState<Customer>(custData[0]);
    
    const [chosenCust, setChosenCust] = useAtom(chosenCustomer);
    
    
    
    useEffect(() => {
        fetch("http://localhost:5210/api/customers").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setCustData(body);
                    
                })
            }
        })
    }, [])


    function sortData(data: Customer[], key: SortKey, reverse: boolean ){
        
        if (!key) return data; //if key doesnt exist...
        
        const sortedData = data.sort((a, b) => {
            return a[key] > b[key] ? 1 : -1
        });
        //a[key] is the same as a.id (or any other variables)
        
        if(reverse){
            return sortedData.reverse();
        }
        
        return sortedData;
    }
    
    const sortedData = useCallback(
        () => sortData( custData,sortKey, sortOrder === "desn"),
        [custData, sortKey, sortOrder]
    ); 
    //useCallback is called once one of the dependencies (stuff in square brakcets) is updated

    function changeSort(key: SortKey){
        setSortOrder(sortOrder === "ascn" ? "desn" : "ascn");
        
        setSortKey(key);
    }
    
    // @ts-ignore
    const headers: {key: SortKey, label: string}[] = [
        {key: "id", label: "ID"},
        {key: "name", label: "Name"},
        {key: "address", label: "Address"},
        {key: "phone", label: "Phone"},
        {key: "email", label: "Email"},
    ];
    
    return <div>
        <table>
            {/* table headers */}
            {/* tr = table row. represents single row, which is what the headers are */}
            <thead>
            <tr>
                {headers.map((row) => {
                    return <td key={row.key}>
                        {row.label}
                        <SortButton
                            sortOrder={sortOrder}
                            columnKey={row.key}
                            sortKey={sortKey}
                            onClick={() => changeSort(row.key)}/>
                    </td>
                })}
            </tr>
            </thead>

            {/* table body */}
            <tbody>
            {sortedData().map((c) => {
                return <tr key={c.id} onClick={() => setChosenCust(c)}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.address}</td>
                    <td>{c.phone}</td>
                    <td>{c.email}</td>
                </tr>
            })}
            </tbody>
        </table>
        
        <h1>{chosenCust != null ? chosenCust.name : ""}</h1>

    </div>
}

// @ts-ignore
function SortButton({
                        sortOrder,
                        columnKey,
                        sortKey,
                        onClick,
                    }: {
    sortOrder: SortOrder;
    columnKey: SortKey;
    sortKey: SortKey;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button onClick={onClick} className=
            {`${sortKey === columnKey && sortOrder === "desn"
                ? "sortButton sortReverse" : "sortButton"}`}>
            ▲
        </button>
    );
}


export default CustomerTable