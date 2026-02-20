import {marked} from "marked"
import Tabs from "./Tabs"
import styles from "./result.module.css"
import MCQLists from "./MCQLists";

type ResultProps = {
  result: {
    topic: string;
    explanation: string;
    mcqs: any[];
  };
  activeTab: "tutorial" | "explanation" | "mcq";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"tutorial" | "explanation" | "mcq">
  >;
};

export default function Result({ result, activeTab, setActiveTab }: ResultProps) {
  const formattedExplanation=marked.parse(result.explanation || "")
  return (
    <div className={styles.result}>
      <h1>{result.topic? result.topic.toUpperCase():""}</h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.tabContent}>
        {activeTab === "tutorial" && (
          <div className={styles.tutorial}>
            <h2>YouTube Tutorial</h2>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                result.topic + " tutorial"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶️ Watch tutorial on YouTube
            </a>
          </div>
        )}

        {activeTab === "explanation" && (
          <div
            className={styles.explanation}
            dangerouslySetInnerHTML={{
              __html: formattedExplanation}}
          />
        )}

        {activeTab === "mcq" && Array.isArray(result.mcqs) &&  (
          <MCQLists mcqs={result.mcqs}/>
        )}
      </div>
    </div>
  )
}
