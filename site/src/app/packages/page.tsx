import styles from "@/styles/Guides.module.css";


export const metadata = {
    title: "Run ZIPCoords Locally via Python and JavaScript",
    description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
    openGraph: {
        title: "Run ZIPCoords Locally via Python and JavaScript",
        description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
        url: "https://zipcoords.us/packages",
        siteName: "ZIPCoords",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "Run ZIPCoords Locally via Python and JavaScript",
        description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
    },
};


export default function PackagesPage()
{
    return (
        <div className={styles.container}>
            <h1>Run ZIPCoords Locally via Python and JavaScript</h1>
            <div className={styles.section}>
                <span className={styles.bold_underline}>Conda:</span>
                <span className={styles.code}>conda install -c zangus zipcoords</span>
            </div>
            <div className={styles.section}>
                <span className={styles.bold_underline}>npm:</span>
                <span className={styles.code}>npm install zipcoords</span>
            </div>
        </div>
    );
}
