"use client";
import Image from "next/image";
import styles from "../page.module.css";

type Props = {
  text: string;
  setText: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBox({
  text,
  setText,
  onSearch,
  loading,
  error,
  setError,
}: Props) {
  return (
    <>
      <div className={styles.searchBox}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />

        <button
          className={styles.button}
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            <Image src="/search.png" alt="search" width={20} height={20} />
          )}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
