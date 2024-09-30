// @ts-ignore
import {useParams} from "react-router-dom";
import {useAtom} from "jotai/index";
import { Paper, paperListAtom } from "./Atoms/PaperListAtom";


function PaperPage(){
    //const params = useParams()
    let {id} = useParams()
    // @ts-ignore
    const [allPapers, setAllPapers] : Paper = useAtom(paperListAtom)
    // @ts-ignore
    const currentPaper: Paper = allPapers.find((paper : Paper) => paper.id == id);
    
    return(
        <>
            <>{currentPaper.id}</>
            
            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>name</>
                <hr className="hr2"/>
            </div>
            <>{currentPaper.name}</>

            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>price</>
                <hr className="hr2"/>
            </div>
            <>{currentPaper.price}</>

            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>stock</>
                <hr className="hr2"/>
            </div>
            <>{currentPaper.stock}</>

            <div className="miniHorizontalBox">
                <hr className="hr2"/>
                <>status</>
                <hr className="hr2"/>
            </div>
            <>{currentPaper.discontinued ? "discontinued" : "in stock"}</>
            

        </>
    )

}

export default PaperPage