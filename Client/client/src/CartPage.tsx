import {useAtom} from "jotai";
import { Paper, paperListAtom } from "./Atoms/PaperListAtom";
import { cartAtom, chosenCustomer, OrderEntryDto } from "./Atoms/CartAtom";
import {useEffect, useReducer, useState} from "react";
import CustomerTable from "./Tables/CustomerTable";
import { Order, OrderEntry } from "./Atoms/OrderAtoms";


function CartPage(){
    
    // @ts-ignore
    const [cart, setCart] = useAtom<OrderEntryDto[]>(cartAtom);

    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom);
    
    // @ts-ignore
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    
    const [chosenCust] = useAtom(chosenCustomer);
    // @ts-ignore
    const [orderValue, setOrderValue] : Order = useState<Order>();
    

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
        return p;
    }
    
    function increaseQuantity(o : OrderEntryDto){
        o.quantity += 1;
        // @ts-ignore
        forceUpdate();
    }

    function decreaseQuantity(o : OrderEntryDto){
        if(o.quantity <= 1){
            o.quantity = 1
            return;
        }
        o.quantity--;
        // @ts-ignore
        forceUpdate();
    }

    function AddOrder(): Promise<Response>{
        
        var now = new Date();
        now.toJSON();
        console.log(now);
        
        return fetch("http://localhost:5210/api/order", {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                orderDate: now,
                status: "in production",
                totalAmount: cart.length,
                customerId: chosenCust!.id
            })
        })
    }

    // @ts-ignore
    function AddOrderEntry(orderE : OrderEntryDto, ordId: number) : OrderEntry{
        
        
        fetch("http://localhost:5210/api/orderEntry", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: orderE.quantity,
                productId: orderE.productId,
                orderId: ordId
            })
        }).then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    let order: OrderEntry = body;
                    console.log(body);
                    return order;
                })
            } else{
                console.error("crap.")
            }
        });
        
        
    }
    
    
    function addAllOrderEntries(){
        
        AddOrder().then(result => {
            result.json().then(order => {
                console.log(order);
                cart.map((o : OrderEntryDto) => {
                    AddOrderEntry(o, order.id);
                });
            })
        })
       
        
        
    }
    
    return <>

        <CustomerTable/>

        <div className="horizontalBox">
            <div className="orderVerticalBox">
                {cart.map((o: OrderEntryDto) => {
                    return <div className="orderBox">
                        <>{GetPaperFromId(o.productId)!.name}</>
                        <div className="quantityHorizontalBox">
                            <>quantity: {o.quantity}</>
                            <div className="quantityVerticalBox">
                                <button className="quantityButton" 
                                        onClick={() => increaseQuantity(o)}>▲</button>
                                <button className="quantityButton" 
                                        onClick={() => decreaseQuantity(o)}>▼</button>
                            </div>
                        </div>

                    </div>
                })}
            </div>

            <div>
                <button onClick={addAllOrderEntries}>place order</button>
            </div>


        </div>

    </>

}

export default CartPage