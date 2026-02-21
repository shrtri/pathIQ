import Link from "next/link";
import Image from "next/Image";
import styles from "./navbar2.module.css"
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="flex items-center gap=2px">
         <Image
           src="logo.png"
           alt="PathIQ_logo"
           height={40}
           width={40}
           />
      </div>
      <Link href="/" className={styles.link}>Home | </Link>
      <Link href="/about" className={styles.link}>About</Link>
    </nav>
  );
}
