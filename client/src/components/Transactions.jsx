import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

//import useFetch from "../hooks/useFetch";
import {shortenAddress, shortenAddress2} from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp,  amount, description, accountType,receiverAccountType }) => {
   // const gifUrl = useFetch({ keyword });

    return (
        <div className="bg-[#1819198] m-4 flex flex-1 border border-gray-500
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
        >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <a addressFrom target="_blank" rel="noreferrer">
                        <p className="text-white text-base">De:   </p>
                        <p className="text-white text-base text-bold">  {shortenAddress2(addressFrom)}</p>

                    </a>

                    <a addressFrom target="_blank" rel="noreferrer">
                        <p className="text-white text-base">Tipo de cuenta:    {accountType} </p>

                    </a>
                    <p className="text-white text-base"> <br/> </p>

                    <a addressTo target="_blank" rel="noreferrer">
                        <p className="text-white text-base">Hacia:      </p>
                        <p className="text-white text-base">  {shortenAddress2(addressTo)}</p>

                    </a>
                    <a addressTo target="_blank" rel="noreferrer">
                        <p className="text-white text-base">Tipo de cuenta:    {receiverAccountType}</p>
                    </a>
                    <p className="text-white text-base"> <br/> <br/> </p>

                    <p className="text-white text-base">Cantidad:  {amount} UCE</p>
                    {description && (
                        <>

                            <p className="text-white text-base">Descripción:   <br/>    {description}</p>
                        </>
                    )}
                </div>


                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
            </div>
        </div>
    );
};

const Transactions = () => {
    const { transactions, currentAccount } = useContext(TransactionContext);

   // console.log("Transactions.jsx " + transactions[0]);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions-blue ">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-bold text-3xl text-center my-2">
                        Últimas transacciones
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Conecta tu cuenta para ver las últimas transacciones
                    </h3>
                )}

                <div className="flex flex-wrap justify-center items-center   ">
                    {transactions.reverse().map((transaction, i) => (
                        <TransactionsCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
};




export default Transactions;