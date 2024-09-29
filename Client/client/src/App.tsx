//import { useState } from 'react'
import { useAtom } from 'jotai'
import './App.css'
import { paperListAtom, Paper } from './Atoms/PaperListAtom'
import {useEffect} from "react";





function App() {
    
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    
    useEffect(() => {
        fetch("http://localhost:5210/api/papers").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllPapers(body);
                })
            }
        })
    }, [])

  return (
      <>
          <div className="mainHorizontalBox">
              
          <div className="verticalBox">
              <>Customer functions</>
              <button >View Papers</button>
              <button className="bg-white font-bold">My Cart</button>
          </div>
              
          <div className="horizontalBox">
          {
              allPapers.map((p: Paper) => {
                  return<div className="flex flex-col">
                      <>{p.name}</>
                      <>{p.discontinued ? "discontinued" : "in stock"}</>
                      <>{p.price}</>
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
