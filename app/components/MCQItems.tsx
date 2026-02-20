"use client"
import { useState } from "react";
import styles from "./mcqs.module.css"

type MCQ = {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

type Props = {
  mcq: MCQ
  index: number
}
export default function MCQItems({mcq, index}: Props){
    const [selected,setSelected]=useState<number | null>(null)

    const isCorrect=selected===mcq.correctIndex

    return(
        <div className={styles.card}>
            {/*questions*/}

            <h3 className={styles.question}>
                {index+1}.{mcq.question}
            </h3>

            {/*options*/}

            <ul>
                {mcq.options.map((option:string , i:number)=>{
                    let className=styles.option

                    if(selected!==null){
                        if(i===mcq.correctIndex) className+= ` ${styles.correct}`
                        else if(i===selected) className+=` ${styles.wrong}`
                    }

                    return(
                        <li key={i} className={className} onClick={()=>selected===null && setSelected(i)}>
                            {option}
                        </li>
                    )
                })}
            </ul>

            {selected!==null &&(
                <div className={styles.explanation}>
                    <strong>
                      {isCorrect ? "Correct!" : "Incorrect!"}
                    </strong>
                    <p>{mcq.explanation}</p>
                </div>
            )}

        </div>

    )
}
