import Input from "@/components/Input";
import "../styles/index.css";
import Output from "@/components/Output";


export default function Home()
{
    return (
        <div className="main">
            <h1>
                ZIPCoords
            </h1>
            <Input />
            <Output />
        </div>
    );
}
