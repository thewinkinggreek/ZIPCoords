import styles from "../styles/Header.module.css";
import Link from "next/link";


export default function Header()
{
    return (
        <div className={styles.headerContainer}>
            <Link href="/" className={styles.titleContainer}>
                ZIPCoords
            </Link>
            <div className={styles.productsContainer}>
                <Link href="/api">
                    API
                </Link>
            </div>
        </div>
    );
}
