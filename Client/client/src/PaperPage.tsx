// @ts-ignore
import {useParams} from "react-router-dom";
import {useAtom} from "jotai/index";
import { Paper, paperListAtom } from "./Atoms/PaperListAtom";
import { useState } from "react";


function PaperPage(){
    //const params = useParams()
    let {id} = useParams()
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    // @ts-ignore
    const currentPaper: Paper = allPapers.find((paper : Paper) => paper.id == id);
    
    //input values
    let nameInput = currentPaper.name;
    let stockInput : string = currentPaper.stock.toString();
    let priceInput : string = currentPaper.price.toString();
    const [newDisconVal, setnewDisconVal] = useState(currentPaper.discontinued);
    
    function updatePaper(newName: string, newStock: number, newPrice: number){
        fetch("http://localhost:5210/api/paper", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: currentPaper.id,
                name: newName,
                discontinued: newDisconVal.valueOf(),
                stock: newStock,
                price: newPrice
            })
        }).then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllPapers(body)
                })
            } else{
                console.error("crap.")
            }
        });
    }
    
    return(
        <>
            <div>
            <>{currentPaper.id}</>
            <br/>
            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>name</>
                <hr className="hr2"/>
            </div>
            <br/>
            <input onChange={e => nameInput = e.target.value} defaultValue={currentPaper.name} />

            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>price</>
                <hr className="hr2"/>
            </div>
            <br/>
            <input onChange={e => priceInput = e.target.value} defaultValue={currentPaper.price}/>

            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>stock</>
                <hr className="hr2"/>
            </div>
            <br/>
            <input onChange={e => stockInput = e.target.value} defaultValue={currentPaper.stock}/>

            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>status</>
                <hr className="hr2"/>
            </div>
            <br/>
            <>{currentPaper.discontinued ? "discontinued" : "in stock"}</>    
                
            <input 
                type="checkbox" 
                onChange={() => 
                    setnewDisconVal(!newDisconVal)} 
                checked={newDisconVal}
            />
                <div className="horizontalBox">
                    <button onClick={() => updatePaper(nameInput,parseInt(stockInput),parseInt(priceInput))}>update paper</button>
                    <button>reset values</button>
                </div>


            </div>
        </>
    )

}

export default PaperPage