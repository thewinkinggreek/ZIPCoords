"use client";


import Link from "next/link";
import styles from "@/styles/Header.module.css";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";


export default function Header()
{
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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
                <div
                    ref={menuRef}
                    className={
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
