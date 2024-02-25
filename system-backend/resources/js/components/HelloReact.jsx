import React from "react";
import ReactDOM from 'react-dom/client';

// import { ReactDOM } from "react";

export default function HelloReact(){
    return(
        <div>
            <header className="text-center">
                <nav className="py-4">

                    <ul className="flex flex-wrap justify-center gap-4">
                    <li className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hamro Neighbourhood</li>
                        <li className="p-2"><a href="#">Home</a></li>
                        <li className="p-2"><a href="#">Home</a></li>
                        <li className="p-2"><a href="#">Home</a></li>
                        <li className="p-2"><a href="#">Home</a></li>
                    </ul>
                </nav>
                <hr />
            </header>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('header')).render(<HelloReact />);
