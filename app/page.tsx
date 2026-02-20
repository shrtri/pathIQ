"use client"
import { useState } from "react"
import styles from "./page.module.css"
import SearchBox from "./components/SearchBox"
import Result from "./components/Result"

export default function Home() {

  //input
  const [text, setText] = useState("")

  //error alert
  const [error,setError]=useState("")

  //tabs
  const [activeTab, setActiveTab] = useState<
    "tutorial" | "explanation" | "mcq"
  >("tutorial")

  //result
  const [result, setResult] = useState<null | {
    topic: string
    explanation: string
    mcqs: string[]
  }>(null)

  //loading
  const [loading,setLoading]=useState(false)

  //when user click on button
  const handleSearch = async () => {
  if (text.trim() === "") {
    setError("Please enter topic");
    return;
  }

  setLoading(true);
  setText("");
  setError("");

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: text }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch AI response");
    }

    const data = await res.json();

    setResult({
      topic: data.topic,
      explanation: data.explanation,
      mcqs: data.mcqs,
    });
  } catch (error:any) {
    console.log("OPENAI error")


    return new Response(
      JSON.stringify({
        error:error?.message || "Unknown server error"
      })
    )
    //setError("AI failed-->check the console");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.search}>
      <h1>What you want to learn today?</h1>

      <SearchBox
        text={text}
        setText={setText}
        onSearch={handleSearch}
        loading={loading}
        error={error}
        setError={setError}
      />

      {result && (
        <Result
          result={result}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  )
}

