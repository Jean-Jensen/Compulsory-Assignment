//import { useState } from 'react'
import { useAtom } from 'jotai'
import './App.css'
import {useEffect} from "react";

import {Order, OrderAtom, OrderEntry, OrderEntryAtom } from './Atoms/OrderAtoms';
import { Paper, paperListAtom } from './Atoms/PaperListAtom';
import { Customer, customerAtom } from './Atoms/CustomerAtom';

function AllOrdersPage() {

    // @ts-ignore
    const [allOrders, setAllOrders] : Order = useAtom(OrderAtom);
    // @ts-ignore
    const [allOrderEntries, setAllOrderEntries] : OrderEntry = useAtom(OrderEntryAtom);
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    // @ts-ignore
    const [allCustomers, setAllCustomers] : Customer = useAtom(customerAtom)
    
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
    
    useEffect(() => {
        fetch("http://localhost:5210/api/customers").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllCustomers(body);
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

export default AllOrdersPage
