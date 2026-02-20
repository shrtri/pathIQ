import Link from "next/link";
import styles from "./navbar2.module.css"
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>Home | </Link>
      <Link href="/about" className={styles.link}>About</Link>
    </nav>
  );
}