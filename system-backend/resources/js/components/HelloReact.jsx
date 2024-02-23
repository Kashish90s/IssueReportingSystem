import React from "react";
import ReactDOM from 'react-dom/client';
// import { ReactDOM } from "react";

export default function HelloReact(){
    return(
        <h1>Hello World</h1>
    )
}

ReactDOM.createRoot(document.getElementById('start')).render(<HelloReact />);
