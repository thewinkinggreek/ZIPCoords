"use client";


import Link from "next/link";
import styles from "@/styles/Header.module.css";
import { useState } from "react";


export default function Header()
{
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.headerContainer}>
            <div className={styles.navBarContainer}>
                <Link
                    href='/'
                    className={styles.titleContainer}
                >
                    ZIPCoords
                </Link>
                <button
                    className={styles.hamburger}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                <div className={
                    `${styles.linksContainer} ${isOpen ? styles.showMenu : ""}`
                }>
                    <Link href='/'>Home</Link>
                    <Link href="/packages">Packages</Link>
                    <Link href="/api-guide">API</Link>
                </div>
            </div>
        </div>
    );
}
