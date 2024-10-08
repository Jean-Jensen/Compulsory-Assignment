//import { useState } from 'react'
import { useAtom } from 'jotai'
import './App.css'
import { paperListAtom, Paper } from './Atoms/PaperListAtom'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { cartAtom, OrderEntryDto } from './Atoms/CartAtom';
// @ts-ignore
import CustomerTable from './Tables/CustomerTable';

function App() {
    
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    // @ts-ignore
    const [cart, setCart] : OrderEntryDto = useAtom(cartAtom);
    
    const navigate = useNavigate();
    
    // @ts-ignore
    const [searchInput, setSearchInput] = useState("")
    
    useEffect(() => {
        fetch("http://localhost:5210/api/papers").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllPapers(body);
                })
            }
        })
    }, [])
    
    // @ts-ignore
    function addToCart(pId : number) {
        
        let newOrder : OrderEntryDto = {
            quantity: 1,
            productId : pId
        };
        
        setCart([...cart, newOrder]);
        
    }
    
    function filterByStock(){
        
        // @ts-ignore
        var checkbox : HTMLInputElement = document.getElementById("stock");
        if(checkbox.checked){
                fetch("http://localhost:5210/api/papersHighestStock").then(httpResponse => {
                    if(httpResponse.ok){
                        httpResponse.json().then(body => {
                            setAllPapers(body);
                        })
                    }
                })
        } else{
            noFilter();
        }
        
    }

    // @ts-ignore
    function filterByPrice(){
        
        // @ts-ignore
        var checkbox : HTMLInputElement = document.getElementById("price");
        if(checkbox.checked){
            fetch("http://localhost:5210/api/papersHighestPrice").then(httpResponse => {
                if(httpResponse.ok){
                    httpResponse.json().then(body => {
                        setAllPapers(body);
                    })
                }
            })
        } else{
            noFilter();
        }
    }

    function noFilter(){
        fetch("http://localhost:5210/api/papers").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllPapers(body);
                })
            }
        })
    }
    
    // @ts-ignore
    function filterByName(){
        if(searchInput === null || searchInput.length <= 0){
           noFilter() 
        } else{
            fetch(`http://localhost:5210/api/papers/${encodeURIComponent(searchInput)}`)
                .then(httpResponse => {
                    if(httpResponse.ok){
                        httpResponse.json().then(body => {
                            setAllPapers(body)
                        })
                    } else{
                        console.error("crap.")
                    }
                });
        }
        
    }
    

  return (
      <>

          <div className="mainHorizontalBox">

              <div className="sideVerticalBox">
                  <div className="titleHorizontalBox">
                      <hr/>
                      <>Customer functions</>
                      <hr/>
                  </div>

                  <button className="sideButton">View Papers</button>
                  <button className="sideButton" onClick={() => navigate(`/cart`)}>
                      Check Cart
                  </button>

                  <button className="sideButton" onClick={() => navigate(`/customerOrders2`)}>
                      Order History 
                  </button>

                  <div className="titleHorizontalBox">
                      <hr/>
                      <>Admin functions</>
                      <hr/>
                  </div>
                  <button className="sideButton" onClick={() => navigate(`/order`)}>
                      All Orders
                  </button>
                  <button className="sideButton">
                      All Customers
                  </button>
                  <button className="sideButton" onClick={() => navigate(`/paper/add`)}>
                      Add Paper
                  </button>
                  <button className="sideButton" onClick={() => navigate(`/property/add`)}>
                      Create Paper Properties
                  </button>

              </div>
              <div className="verticalBox">

                  <div className="miniHorizontalBox">
                      <input onChange={event => setSearchInput(event.target.value)}/>
                      <button onClick={() => filterByName()}>search</button>
                  </div>
                  <div className="miniHorizontalBox">
                      <input id="stock" type="checkbox" onChange={() => filterByStock()}/>
                      <input id="price" type="checkbox" onChange={() => filterByPrice()}/>
                  </div>

                  <div className="sideHorizontalBox">

                      {
                          allPapers.map((p: Paper) => {
                              return <div className="itemVerticalBox">
                                  <div className="miniHorizontalBox">
                                      <hr className="hr2"/>
                                      <>name</>
                                      <hr className="hr2"/>
                                  </div>
                                  <>{p.name}</>

                                  <div className="miniHorizontalBox">
                                      <hr className="hr2"/>
                                      <>price</>
                                      <hr className="hr2"/>
                                  </div>
                                  <>{p.price}</>

                                  <div className="miniHorizontalBox">
                                      <hr className="hr2"/>
                                      <>stock</>
                                      <hr className="hr2"/>
                                  </div>
                                  <>{p.stock}</>

                                  <div className="miniHorizontalBox">
                                      <hr className="hr2"/>
                                      <>status</>
                                      <hr className="hr2"/>
                                  </div>
                                  <>{p.discontinued ? "discontinued" : "in stock"}</>

                                  <button key={p.id} onClick={() => navigate(`/paper/${p.id}`)}>
                                      view page
                                  </button>
                                  <button onClick={() => addToCart(p.id)}>add to cart</button>

                              </div>
                          })
                      }
                  </div>
              </div>


          </div>
      </>
  )
}

export default App
