import Link from "next/link";
import styles from "@/styles/Header.module.css";


export default function Header()
{
    return (
        <div className={styles.headerContainer}>
            <div className={styles.navBarContainer}>
                <Link href='/' className={styles.titleContainer}>
                    ZIPCoords
                </Link>
                <div className={styles.linksContainer}>
                    <Link href='/'>
                        Home
                    </Link>
                    <Link href="/api-guide">
                        API
                    </Link>
                    <Link href="https://github.com/mikezangus/ZIPCoords">
                        GitHub
                    </Link>
                </div>
            </div>
        </div>
    );
}
