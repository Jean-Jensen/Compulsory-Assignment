//import { useState } from 'react'
import { useAtom } from 'jotai'
import './App.css'
import {useEffect} from "react";
import {Property, propertyListAtom} from './Atoms/PropertyListAtom';
//import {useNavigate} from "react-router-dom";

function AddPropertyPage() {

    // @ts-ignore
    const [allProperties, setAllProperties] : Propety = useAtom(propertyListAtom)
    //const navigate = useNavigate();
    // @ts-ignore
    let propertyName : string;
    
    
    useEffect(() => {
        fetch("http://localhost:5210/api/property").then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllProperties(body);
                })
            }
        })
    }, [])

    function AddProperty(newName: string){
        fetch("http://localhost:5210/api/property", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id : 0,
                propertyName: newName
            })
        }).then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllProperties([...allProperties, body])
                })
            } else{
                console.error("crap.")
            }
        });
    }
    
    return (
        <>

            <div className="mainHorizontalBox">

                <div className="sideVerticalBox">
                    
                    <input onChange={e => propertyName = e.target.value}/>
                    
                    <button className="sideButton" onClick={() => AddProperty(propertyName)}>
                        Add Property</button>
                </div>

                <div className="sideHorizontalBox">
                    {
                        allProperties.map((p: Property) => {
                            return <div className="itemVerticalBox">
                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>ID</>
                                    <hr className="hr2"/>
                                </div>
                                <>{p.id}</>

                                <div className="miniHorizontalBox">
                                    <hr className="hr2"/>
                                    <>name</>
                                    <hr className="hr2"/>
                                </div>
                                <>{p.propertyName}</>
                                
                            </div>
                        })
                    }
                </div>
                
                {
                    allProperties.map((p: Property) => {
                        console.log(p.propertyName)
                    })
                }

            </div>
        </>
    )
}

export default AddPropertyPage
