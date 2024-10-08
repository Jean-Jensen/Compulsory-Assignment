//import { useState } from 'react'
import { useAtom } from 'jotai'
import './App.css'
import {useEffect, useState} from "react";

import {Order, OrderAtom, OrderEntry, OrderEntryAtom } from './Atoms/OrderAtoms';
import { Paper, paperListAtom } from './Atoms/PaperListAtom';
import { Customer, customerAtom } from './Atoms/CustomerAtom';
import CustomerTable from './Tables/CustomerTable';
import { chosenCustomer } from './Atoms/CartAtom';

function CustomerOrders2() {

    // @ts-ignore
    const [allOrders, setAllOrders] : Order = useAtom(OrderAtom);
    // @ts-ignore
    const [allOrderEntries, setAllOrderEntries] : OrderEntry = useAtom(OrderEntryAtom);
    
    const [filteredOrderE, setfilteredOrderE] = useState<OrderEntry[]>([]);
    
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    // @ts-ignore
    const [allCustomers, setAllCustomers] : Customer = useAtom(customerAtom)

    // @ts-ignore
    const [chosenCust, setChosenCust] = useAtom(chosenCustomer);
    
    const [firstRender, setFirstRender] = useState(true); //is it the first render?
    

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
                    setfilteredOrderE(body);
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

    useEffect(() => {
        fetch("http://localhost:5210/api/customers").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllCustomers(body);
                })
            }
        })
    }, [])

    /*
    useEffect(() => {
        // @ts-ignore
        fetch(`http://localhost:5210/api/order/${chosenCust.id}`).then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllOrders(body);
                })
            }
        })
    }, [chosenCust])
     */

    function GetPaperFromId(ID: number){
        // @ts-ignore
        let p : Paper ;
        allPapers.forEach(function (value: Paper) {
            if (value.id == ID){
                p = value;
            }
        })

        // @ts-ignore
        return p;
    }

    function GetCustomerFromId(ID: number){
        let c: Customer;

        allCustomers.forEach(function (value: Customer) {
            if(value.id == ID){
                c = value;
            }
        })

        // @ts-ignore
        return c;

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

    useEffect(() => {
        if(!firstRender){
            // @ts-ignore
            filterOrderEntriesByCust(chosenCust)
        } else {
            setFirstRender(false);
        }
    }, [chosenCust]);
    
    // @ts-ignore
    function filterOrderEntriesByCust(cust : Customer){
        let custId = cust.id;
        setfilteredOrderE(allOrderEntries.filter((o : OrderEntry) => getOrderFromId(o.orderId).customerId === custId))
    }

    //I can't find a way to comment inside the return so here:
    // the "!" at "GetPaperFromId(o.productId)!.name"  is 
    // to tell the program that I'm sure the return from this method won't be null
    //you can test this by removing it and seeing what happens
    return (
        <>
            
            <CustomerTable/>
            
            <div className="mainHorizontalBox">

                <div className="sideHorizontalBox">
                    {
                        filteredOrderE.map((o: OrderEntry) => {
                            return <div className="itemVerticalBox">
                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>product name</>
                                    <hr className="hr2"/>
                                </div>
                                <>{GetPaperFromId(o.productId)!.name}</>

                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>customer</>
                                    <hr className="hr2"/>
                                </div>
                                <>{GetCustomerFromId(getOrderFromId(o.orderId).customerId)!.name}</>

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

                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>delivery date</>
                                    <hr className="hr2"/>
                                </div>
                                <>{getOrderFromId(o.orderId)!.deliveryDate}</>

                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>status</>
                                    <hr className="hr2"/>
                                </div>
                                <>{getOrderFromId(o.orderId)!.status}</>

                            </div>
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default CustomerOrders2
