//import { useState } from 'react'
import { useAtom } from 'jotai'
import './App.css'
import {useEffect, useState} from "react";

import {Order, OrderAtom, OrderEntry, OrderEntryAtom } from './Atoms/OrderAtoms';
import { Paper, paperListAtom } from './Atoms/PaperListAtom';

function AllOrdersPage() {

    // @ts-ignore
    const [allOrders, setAllOrders] : Order = useAtom(OrderAtom);
    // @ts-ignore
    const [allOrderEntries, setAllOrderEntries] : OrderEntry = useAtom(OrderEntryAtom);
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    
    //const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5210/api/order").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllOrders(body);
                })
            }
        })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5210/api/orderEntry").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllOrderEntries(body);
                })
            }
        })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5210/api/papers").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllPapers(body);
                })
            }
        })
    }, [])
    
    function GetPaperFromId(ID: number){
        // @ts-ignore
        let p : Paper ;
        allPapers.forEach(function (value: Paper) {
            if (value.id == ID){
                p = value;
            }
        })

        // @ts-ignore
        console.log(p)
        // @ts-ignore
        return p;
    }

    // @ts-ignore
    function GetPaperNameFromId(ID: number){
        const [p, setP] = useState<Paper>();
        fetch("http://localhost:5210/api/papersFromId", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: ID
            })
        }).then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setP(body);
                })
            }
        })
        if(p != null){
            return p.name;
        }
        return "name not found";
    }
    
    function getOrderFromId(id : number){
        let o: Order;
        
        allOrders.forEach(function (value : Order) {
            if(value.id == id){
                o = value;
            }
        })
        // @ts-ignore
        console.log(o)
        // @ts-ignore
        return o;
    }
    
    //I can't find a way to comment inside the return so here:
    // the "!" at "GetPaperFromId(o.productId)!.name"  is 
    // to tell the program that I'm sure the return from this method won't be null
    //you can test this by removing it and seeing what happens
    return (
        <>
            <div className="mainHorizontalBox">

                <div className="sideHorizontalBox">
                    {
                        allOrderEntries.map((o: OrderEntry) => {
                            return <div className="itemVerticalBox">
                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>product name</>
                                    <hr className="hr2"/>
                                </div>
                                <>{ GetPaperFromId(o.productId)!.name}</> 
                                
                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>quantity</>
                                    <hr className="hr2"/>
                                </div>
                                <>{o.quantity}</>

                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>order date</>
                                    <hr className="hr2"/>
                                </div>
                                <>{getOrderFromId(o.orderId)!.orderDate}</>

                            </div>
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default AllOrdersPage
