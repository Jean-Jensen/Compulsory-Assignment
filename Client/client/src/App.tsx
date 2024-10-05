//import { useState } from 'react'
import { useAtom } from 'jotai'
import './App.css'
import { paperListAtom, Paper } from './Atoms/PaperListAtom'
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { cartAtom } from './Atoms/CartAtom';
import CustomerTable from './Tables/CustomerTable';

function App() {
    
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    // @ts-ignore
    const [cart, setCart] : Paper = useAtom(cartAtom);
    
    const navigate = useNavigate();
    
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
        
        allPapers.forEach(function (paper: Paper) {
            if(paper.id == pId){
                setCart([...cart, paper]);
            }
        })
        
    }
    
    

  return (
      <>
          
          <CustomerTable/>
          
          <div className="mainHorizontalBox">
                
              <div className="sideVerticalBox">
                  <div className="titleHorizontalBox">
                      <hr/>
                      <>Customer functions</>
                      <hr/>
                  </div>

                  <button className="sideButton">View Papers</button>
                  <button className="sideButton">Check Cart</button>

                  <div className="titleHorizontalBox">
                      <hr/>
                      <>Admin functions</>
                      <hr/>
                  </div>
                  <button className="sideButton" onClick={() => navigate(`/order`)}>
                      All Orders</button>
                  <button className="sideButton">
                      All Customers</button>
                  <button className="sideButton" onClick={() => navigate(`/paper/add`)}>
                      Add Paper </button>
                  <button className="sideButton" onClick={() => navigate(`/property/add`)}>
                      Create Paper Properties </button>

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
                                  view page</button>
                              <button onClick={() => addToCart(p.id)}>add to cart</button>
                              
                          </div>
                      })
              }
              </div>
              {
                  allPapers.map((p: Paper) => {
                      console.log(p.name)
                  })
              }

          </div>
      </>
  )
}

export default App
