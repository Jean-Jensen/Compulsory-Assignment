// @ts-ignore
import {useParams} from "react-router-dom";
import {useAtom} from "jotai/index";
import { Paper, paperListAtom } from "./Atoms/PaperListAtom";
import { useState } from "react";


function AddPaperPage(){
    
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    

    //input values
    let nameInput : string ;
    let stockInput : string;
    let priceInput : string;
    const [newDisconVal, setnewDisconVal] = useState(false);

    function AddPaper(newName: string, newStock: number, newPrice: number){
        fetch("http://localhost:5210/api/paper", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName,
                discontinued: newDisconVal.valueOf(),
                stock: newStock,
                price: newPrice
            })
        }).then(httpResponse => {
            if(httpResponse.ok){
                httpResponse.json().then(body => {
                    setAllPapers([...allPapers, body])
                })
            } else{
                console.error("crap.")
            }
        });
    }

    return(
        <>
            <div>
                <br/>
                <div className="miniHorizontalBox">
                    <hr className="hr2"/>
                    <>name</>
                    <hr className="hr2"/>
                </div>
                <br/>
                <input onChange={e => nameInput = e.target.value}  />

                <div className="miniHorizontalBox">
                    <hr className="hr2"/>
                    <>price</>
                    <hr className="hr2"/>
                </div>
                <br/>
                <input onChange={e => priceInput = e.target.value} />

                <div className="miniHorizontalBox">
                    <hr className="hr2"/>
                    <>stock</>
                    <hr className="hr2"/>
                </div>
                <br/>
                <input onChange={e => stockInput = e.target.value} />

                <div className="miniHorizontalBox">
                    <hr className="hr2"/>
                    <>status</>
                    <hr className="hr2"/>
                </div>
                <br/>
                <>{newDisconVal ? "discontinued" : "in stock"}</>

                <input
                    type="checkbox"
                    onChange={() =>
                        setnewDisconVal(!newDisconVal)}
                    checked={newDisconVal}
                />
                <div className="horizontalBox">
                    <button onClick={() => AddPaper(nameInput,parseInt(stockInput),parseInt(priceInput))}>
                        add paper</button>
                </div>


            </div>
        </>
    )

}

export default AddPaperPage