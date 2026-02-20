"use client"
import MCQItems from "./MCQItems";

type MCQ ={
    question:string
    options:string[]
    correctIndex:number
    explanation:string
}

type Props={
    mcqs : MCQ[]
}
const MCQLists=({mcqs} : Props)=>{
    return(
        <div>
          {mcqs.map((mcq,index)=>(
            <MCQItems key={index} index={index} mcq={mcq}/>
           ))}
        </div>
    )
}
export default MCQLists;