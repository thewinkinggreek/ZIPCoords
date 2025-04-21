import { Analytics } from "@vercel/analytics/react"
import Header from "@/components/Header";
import "@/styles/index.css";


export const metadata = {
    title: "ZIPCoords",
    description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
    openGraph: {
        title: "ZIPCoords",
        description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
        url: "https://zipcoords.us",
        siteName: "ZIPCoords",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "ZIPCoords",
        description: "Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
    },
};


export default function RootLayout({ children }: { children: React.ReactNode })
{
    return (
        <html lang="en">
            <body>
                <header>
                    <Header />
                </header>
                <main>
                    {children}
                    <Analytics />
                </main>
            </body>
        </html>
    );
}
