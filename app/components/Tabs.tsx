import styles from "./tabs.module.css"

type Props = {
  activeTab: "tutorial" | "explanation" | "mcq"
  setActiveTab: (tab: "tutorial" | "explanation" | "mcq") => void
}

export default function Tabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "tutorial" ? styles.active : ""}`}
        onClick={() => setActiveTab("tutorial")}
      >
        Tutorial
      </button>

      <button
        className={`${styles.tab} ${activeTab === "explanation" ? styles.active : ""}`}
        onClick={() => setActiveTab("explanation")}
      >
        Explanation
      </button>

      <button
        className={`${styles.tab} ${activeTab === "mcq" ? styles.active : ""}`}
        onClick={() => setActiveTab("mcq")}
      >
        MCQs
      </button>
    </div>
  )
}
