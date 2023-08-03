import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

//esto es para que la applicacion tenga acceso a los datos que se le pasa

ReactDOM.render(
    <TransactionsProvider>
        <React.StrictMode>
         <App />
        </React.StrictMode>
    </TransactionsProvider>,
    document.getElementById("root")
);

