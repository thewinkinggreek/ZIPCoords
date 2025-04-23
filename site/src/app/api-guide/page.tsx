import styles from "@/styles/Guides.module.css";


export const metadata = {
    title: "ZIPCoords API Guide",
    description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
    openGraph: {
        title: "ZIPCoords API Guide",
        description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
        url: "https://zipcoords.us/api-guide",
        siteName: "ZIPCoords",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "ZIPCoords API Guide",
        description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
    },
};


export default function APIGuidePage()
{
    return (
        <div className={styles.container}>
            <h1>ZIPCoords API Guide</h1>
            <div className={styles.section}>
                <span className={styles.bold_underline}>URL Structure:</span>
                <span className={styles.code}>{"zipcoords.us/api?q={input}"}</span>
            </div>
            <div className={styles.section}>
                <div className={styles.bold_underline}>Example: Get coordinates via ZIP Code</div>
                <div>
                    <span className={styles.bold}>ZIP Code:</span>
                    <span className={styles.code}> 10001</span>
                </div>
                <div>
                    <span className={styles.bold}>URL:</span>
                    <span className={styles.code}> zipcoords.us/api?q=10001</span>
                </div>
                <div>
                    <span className={styles.bold}>JSON response:</span>
                    <span className={styles.code}> {'{"lat":40.7536854,"lon":-73.9991637}'}</span>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.bold_underline}>Example: Get ZIP Code via coordinates</div>
                <div>
                    <span className={styles.bold}>Coordinates:</span>
                    <span className={styles.code}> 34.1030032, -118.4104684</span>
                </div>
                <div>
                    <span className={styles.bold}>URL:</span>
                    <span className={styles.code}> zipcoords.us/api?q=34.1030032,-118.4104684</span>
                </div>
                <div>
                    <span className={styles.bold}>JSON response:</span>
                    <span className={styles.code}> {'{"zip_code":90210}'}</span>
                </div>
            </div>
        </div>
    );
}
