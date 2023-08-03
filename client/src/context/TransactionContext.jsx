import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
//import { setTimeout } from "timers/promises";

import { contractABI, contractAddress } from "../utils/constants";
//import {Welcome} from "../components/index.js";



export const TransactionContext = React.createContext();

//con esto se que tengo un objeto window. ethereum
// para poder manejar las transacciones y lo veo en console del navegador
const { ethereum } = window;


//let visibilityLogin = "hidden";
//let visibilityVar = "";

let visibilityLogin = "";
let visibilityVar = "hidden";

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("LOG inicial");
    console.log({

        provider,
        signer,
        transactionsContract
    });


    return transactionsContract;
}

export const TransactionsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setformData] = useState({ amount: "", description: "" });
    const [formData2, setformData2] = useState({ email: "", password: ""});

    const [isLoading, setIsLoading] = useState(false);
   // const [transactionCount, setTransactionCount] = useState(localStorage.getItem("0"));
    const [UCEResourcesCount, setUCEResourcesCount] = useState("0");
    const [UCEResourcesAmount, setUCEResourcesAmount] = useState("0");

    const [discountCount, setDiscountCount] = useState("0");
    const [discountAmount, setDiscountAmount] = useState("0");

    const [volunteerActivitiesCount, setVolunteerActivitiesCount] = useState("0");
    const [volunteerActivitiesAmount, setVolunteerActivitiesAmount] = useState("0");


    const [currentUserData, setCurrentUserData] = useState([]);
    const [currentUserDataArray, setCurrentUserDataArray] = useState([]);

    const [allUserData, setAllReceiverUserData] = useState([]);
    let [receiverAccount, setReceiverAccount] = useState("");

    const [currentAccountBalance, setCurrentAccountBalance] = useState("");

    const [transactions, setTransactions] = useState([]);



    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));

    };

    const handleChange2 = (e, name) => {
        setformData2((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const connectWalletFirstTime = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }


  /*  const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                const currentTransactionCount = await transactionsContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
*/


    const checkMetrics = async () => {
        try {

            if (ethereum) {

                const transactionsContract = createEthereumContract();

                const volunteerActivitiesCount = await transactionsContract.getVolunteerActivitiesCount();
                console.log("volunteerActivitiesCount " + volunteerActivitiesCount.toString());

                // window.localStorage.setItem("volunteerActivitiesCount", volunteerActivitiesCount);
                 setVolunteerActivitiesCount(volunteerActivitiesCount.toString());

                const volunteerActivitiesAmount = await transactionsContract.getVolunteerActivitiesAmount();
                const volunteerActivitiesAmountAux = parseInt(volunteerActivitiesAmount._hex) / (10 ** 18)
                console.log("volunteerActivitiesAmountAux " + volunteerActivitiesAmountAux.toString());
                // window.localStorage.setItem("volunteerActivitiesAmount", volunteerActivitiesAmountAux.toString());
                setVolunteerActivitiesAmount(volunteerActivitiesAmountAux.toString());

                const UCEResourcesCount = await transactionsContract.getUCEResourcesCount();
              //  window.localStorage.setItem("UCEResourcesCount", UCEResourcesCount);
                setUCEResourcesCount(UCEResourcesCount.toString());


                const UCEResourcesAmount = await transactionsContract.getUCEResourcesAmount();
                const UCEResourcesAmountAux = parseInt(UCEResourcesAmount._hex) / (10 ** 18)
              //  window.localStorage.setItem("UCEResourcesAmount", UCEResourcesAmountAux.toString());
                console.log("UCEResourcesAmountAux " + UCEResourcesAmountAux.toString());
                setUCEResourcesAmount(UCEResourcesAmountAux.toString());

                const discountCount = await transactionsContract.getDiscountCount();
               // window.localStorage.setItem("discountCount", discountCount);
                 setDiscountCount(discountCount.toString());

                const discountAmount = await transactionsContract.getDiscountAmount();
            //console.log("discountAmount" + discountAmount)
                const discountAmountAux = parseInt(discountAmount._hex) / (10 ** 18)
                console.log("discountAmountAux" + discountAmountAux)
                setDiscountAmount(discountAmountAux.toString());


               // window.localStorage.setItem("discountAmount", discountAmountAux.toString());








            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };


    const checkAccountBalance = async () => {
        try {

            if (ethereum) {

                const transactionsContract = createEthereumContract();
                console.log("currentAccount:: " + currentAccount);

                const currentAccountBalance = await transactionsContract.balanceOf(currentUserData.address);
                console.log("currentAccountBalance await "+  ( parseInt(currentAccountBalance._hex,16)/1000000000000000000 ).toFixed(0)   );
                //console.log("currentAccountBalance await "+ (  (  currentAccountBalance._hex ).toString(10) ) /1000000000000000000);


                let auxCurrentAcountBalance =  (parseInt(currentAccountBalance._hex,16)/1000000000000000000).toFixed(0);
               //  auxCurrentAcountBalance = Math.round(auxCurrentAcountBalance);

                setCurrentAccountBalance(auxCurrentAcountBalance.toString()   );





            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                console.log("transactions   " + await transactionsContract.getTransactionCount());
                const availableTransactions = await transactionsContract.getAllTransactions();

                console.log("Dentro de get Transactions " + availableTransactions);

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18),
                    description: transaction.description,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    accountType: transaction.accountType,
                    receiverAccountType: transaction.receiverAccountType
                  }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);


            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const checkIfWalletIsConnect = async () => {
        try {

        if (!ethereum) return alert("Please install MetaMask.");

        const accounts = await ethereum.request({method: "eth_accounts"});
            console.log("Cuentas:...");
        console.log(accounts);

        if (accounts.length) {
            setCurrentAccount(accounts[0]);

           await  getAllTransactions();
        } else {
            console.log("No accounts found");
        }
    } catch    (error)   {
        console.log(error);
    }
};






    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const {email, password} = formData2;


           /* const accounts = await ethereum.request({method: "eth_accounts"});
            console.log("Cuentas:...");
            console.log(accounts);
           */


            console.log("despues de formData2 " + " "+email + " " + password);
            const transactionsContract = createEthereumContract();



//aqui deberia verificar usuario desde contrato


            const usersReaded = await transactionsContract.getAllUsers();
            console.log("usersReaded " + usersReaded);
           // console.log("usersReaded [0] " + usersReaded[0]);
            //console.log("usersReaded " + usersReaded);

            const structuredUsers = usersReaded.map((user) => ({
                address: user.addr,
                name: user.name,
                email: user.email,
                password: user.password,
                accountType: user.accountType

            }));

            console.log(structuredUsers);

           let foundUser = false;

            for (let i = 0; i < structuredUsers.length; i++) {
                console.log("dentro for 1: email " +  structuredUsers[i].email.toString()  );
                console.log("dentro for 2: password " +  structuredUsers[i].password.toString()  );

                if (email === structuredUsers[i].email.toString() && password === structuredUsers[i].password.toString() ){


                    await console.log("dentro de for " + structuredUsers[i].address);

                    await setCurrentAccount(structuredUsers[i].address);

                    currentUserDataArray.push("Usuario:  " + structuredUsers[i].name, "Rol:  " + structuredUsers[i].accountType);

                    //paso los datos del usuario al arreglo
                    setCurrentUserData(structuredUsers[i]);
                    setAllReceiverUserData(structuredUsers);

                    const currentAccountBalance = await transactionsContract.balanceOf(structuredUsers[i].address);
                    console.log("currentAccountBalance await "+ (parseInt(currentAccountBalance._hex,16)/1000000000000000000).toString());
                    //console.log("currentAccountBalance await "+ (  (  currentAccountBalance._hex ).toString(10) ) /1000000000000000000);


                    const auxCurrentAcountBalance =  (parseInt(currentAccountBalance._hex,16)/1000000000000000000).toString();
                    setCurrentAccountBalance(auxCurrentAcountBalance   );



                    //window.sessionStorage.setItem("currentUserData", structuredUsers[i].name);

                    //  console.log("dentro de for " + structuredUsers[i].address);
                    foundUser = true;

                    break;
                }



            }

            if (!foundUser) return alert("Credenciales erroneas");


            console.log("fuera de for, despues de foundUser" );

            // setCurrentAccount(userlogged)


           // visibilityVar = ""
          //  visibilityLogin = "hidden"

          //  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            visibilityVar = ""
            visibilityLogin = "hidden"
          //  console.log("currentAccountBalance beforea "+ currentAccountBalance);

            //setCurrentAccountBalance("");
            await getAllTransactions();
            //setCurrentUserDataArray();

           // await   checkAccountBalance();
         //   setCurrentAccount(accounts[0]);

          //  window.location.reload();
         // await checkIfWalletIsConnect();


        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }


    const disconnectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            //const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            visibilityVar = "hidden"
            visibilityLogin = ""
            setCurrentAccount('');
            setCurrentUserData([]);



            setTransactions([]);
            setCurrentUserDataArray([]);
            setCurrentAccountBalance("0");
           //window.localStorage.setItem("currentAccountBalance", "0" );
            console.log("Se desconecto la cuenta");
            //  window.location.reload();


        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }








    const sendTransaction = async () => {
        console.log("TransContext: receiverAccount " + receiverAccount)

        try {
            if (ethereum) {

     console.log("TransContext: receiverAccount " + receiverAccount)

                const {amount, description} = formData;

                let receiverAccountType = "";

                for (let i = 0; i < allUserData.length; i++) {
                    // console.log("dentro for allUserData: email " +  structuredUsers[i].email.toString()  );
                    //  console.log("dentro for allUserData: password " +  structuredUsers[i].password.toString()  );

                    if (receiverAccount === allUserData[i].address.toString()) {

                        receiverAccountType = allUserData[i].accountType.toString();


                        await console.log("tipo cuenta a enviar: " + allUserData[i].accountType.toString());

                        break;
                    }

                }

                const transactionsContract = createEthereumContract();

                const parsedAmount = ethers.utils.parseEther(amount);
console.log("parsedAmount " + parsedAmount);

                await transactionsContract.transfer(receiverAccount,parsedAmount)

                /*await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: receiverAccount,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    }],
                });*/

                //console.log("currentUserData" + currentUserData);

                //console.log("currentUserData accountType" + currentUserData.accountType.toString());

                const  transactionHash = await transactionsContract.addToBlockchain(receiverAccount, parsedAmount, description, currentUserData.accountType.toString(), receiverAccountType);

                setIsLoading(true);

                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);

            //espera, para que asome el cargando 2 segundos
              //  await setTimeout(2000);
                setIsLoading(false);

                //const transactionsCount = await transactionsContract.getTransactionCount();

                //setTransactionCount(transactionsCount.toNumber());
               await  getAllTransactions();
                await checkAccountBalance();
                //window.location.reload();
                //visibilityVar = ""
                //visibilityLogin = "hidden"
                await checkMetrics();
            } else {
                console.log("No ethereum object");
            }




            } catch
            (error)
            {
                console.log(error);

                throw new Error("No ethereum object");
            }

    };




    useEffect(() => {
     //   checkIfWalletIsConnect().then(r => {});
     //   checkIfTransactionsExists().then(r => {});

        checkMetrics().then(r => {});
     //   connectWalletFirstTime().then(r => {});

    },[]);




    return (
        <TransactionContext.Provider value={{
            connectWallet,
            connectWalletFirstTime,
            disconnectWallet,
            currentAccount,
            currentUserData,
            currentUserDataArray,
            setCurrentUserDataArray,
            allUserData,
            receiverAccount,
            setReceiverAccount,
            formData,
            formData2,
            setformData,
            setformData2,
            sendTransaction,
            handleChange,
            handleChange2,
            transactions,
            isLoading,
            visibilityVar,
            visibilityLogin,

            discountCount,
            discountAmount,
            UCEResourcesCount,
            UCEResourcesAmount,
            volunteerActivitiesCount,
          volunteerActivitiesAmount,


            currentAccountBalance

        }}>
            {children}

        </TransactionContext.Provider>
    );
}






