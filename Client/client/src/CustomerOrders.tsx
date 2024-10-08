import {useAtom} from "jotai";
import { chosenCustomer } from "./Atoms/CartAtom";
import CustomerTable from "./Tables/CustomerTable";
import { Order, OrderEntry } from "./Atoms/OrderAtoms";
import {useEffect, useState} from "react";


function CustomerOrders(){


    // @ts-ignore
    const [chosenCust, setChosenCust] = useAtom(chosenCustomer);
    
    const [orders, setOrders] = useState<Order[]>([]);

    // @ts-ignore
    const [orderEntries, setOrderEntries] = useState<OrderEntry[]>([]);
    
    const [firstRender, setFirstRender] = useState(false); //if the first render has been done
    
    useEffect(() => {
        if(firstRender) {
            // @ts-ignore
            fetch(`http://localhost:5210/api/order/${chosenCust.id}`).then(httpResponse => {
                if(httpResponse.ok){
                    httpResponse.json().then(body => {
                        setOrders(body);
                        // @ts-ignore
                        console.log("chosen ID: " + chosenCust.id)
                        console.log(orders)
                        console.log()
                    })
                } else {
                    console.log("theres been an error")
                }
            })
        } else {
            setFirstRender(true);
        }
    }, [chosenCust])

    
    useEffect(() => {
        setOrderEntries([]);
        orders.map((o : Order) => {
            fetch(`http://localhost:5210/api/orderEntry/${o.id}`).then(httpResponse => {
                if(httpResponse.ok){
                    httpResponse.json().then(body => {
                        setOrderEntries(orderEntries.concat(body));
                    })
                } else {
                    console.log("there's been an error with the order entries");
                }
            })
        })
        
    }, [chosenCust])
    
    
    return <>
        <CustomerTable/>
        <div >
            {
                firstRender ? orderEntries.map((o : OrderEntry) => {
                   return <div className="itemVerticalBox">
                       <>quantity: {o.quantity}</>
                       <br/>
                       <>Id: {o.id}</>
                       <br/>
                       <>OrderId: {o.orderId}</>
                   </div>
                }) : ""
            }

        </div>


    </>

}

export default CustomerOrders