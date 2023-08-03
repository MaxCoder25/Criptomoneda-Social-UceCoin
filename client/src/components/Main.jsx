import React, {useContext, useState} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import {BsCashStack, BsInfoCircle, BsShieldFillCheck} from "react-icons/bs";
import uceCoinIcon from "../../images/uceCoinIcon2.svg";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress,shortenAddress2 } from "../utils/shortenAddress";
import { Loader } from ".";
import {BiSearchAlt} from "react-icons/bi";
import {RiHeart2Fill} from "react-icons/ri";

//const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder,name , type, value, handleChange }) => (
            <input
                placeholder={placeholder}
                type={type}
                step="1"
                value={value}
                onChange={(e) => handleChange(e, name)}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
            />
        );

const Input2 = ({ placeholder, name,value, type, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);



const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className=" flex flex-row justify-start items-start       p-2 m-2 cursor-pointer bg-blue-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100  ">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className=" text-white font-semibold  text-xl">{title}</h1>

            <h2 className="  text-white text-center font-bold  text-4xl md:w-9/12">
                {subtitle}
            </h2>

            <p className="mt-1 text-white text-center font-bold  text-2xl   md:w-9/12">
                UCE Coin

            </p>
            <br />





        </div>
    </div>
);


const Main = () => {

const {connectWallet,
    connectWalletFirstTime,
    disconnectWallet,
    currentAccount,
    allUserData,
    receiverAccount,
    setReceiverAccount,
    formData,
    formData2,
    setFormData,
    setFormData2,
    handleChange,
    handleChange2,
    sendTransaction,
    isLoading,
    visibilityVar,
    visibilityLogin,

    currentAccountBalance



} = useContext(TransactionContext);


const [isOpen, setOpen] = useState(false);

let [dropdownOption, setDropdownOption] = useState("");

 let handleDropdownChange = (e) => {
     setDropdownOption(e.target.value)
     console.log("printSelectedName:  " + e.target.value);

     for (let i = 0; i < allUserData.length; i++) {
         // console.log("dentro for allUserData: email " +  structuredUsers[i].email.toString()  );
         //  console.log("dentro for allUserData: password " +  structuredUsers[i].password.toString()  );

         if (e.target.value === allUserData[i].name.toString()) {
             setReceiverAccount(allUserData[i].address.toString());
             console.log("printReceiverAccount:  " + allUserData[i].address.toString());

             break;
         }

     }

    }



    const handleDropDown = () => {


        setOpen(!isOpen);

    };

    const handleSubmit = (e) => {

        const { amount, description } = formData;

        e.preventDefault();

        if ( !amount || !description ) return;

        sendTransaction();
   };

   const handleSubmit2 = (e) => {
        const {email, password} = formData2;
      //  console.log("Dentro de handleSubmit2 email pass " +email +" "+ password);

        e.preventDefault();

        if (!email || !password) return;

        connectWallet();
       //connectWalletFirstTime();

    };

    const printSelectedName= (name) => {

         console.log("printSelectedName:  " + name);


    }





    return (
        <div className="flex w-full justify-center items-center gradient-bg-welcome-blue">
            <div className={`flex-col flex-1 items-center justify-start w-full md:  px-36  ${visibilityLogin}` }   >

                <div className="my-10  flex flex-1 justify-start items-center flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white font-bold text-center  py-1">
                        UCE COIN <br /> Criptomoneda social
                    </h1>

                    <p className="text-center mt-5  text-white text-base">
                              Recompensando a los estudiantes por las buenas acciones.

                        <br />
                        <br />


                    </p>





                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start background-siiu-uce items-center    bg-blue-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                        <h1 className="text-white  font-semibold text-lg "    >
                            Iniciar Sesión
                        </h1>
                        <Input2   placeholder="Email" name="email" type="text" handleChange={handleChange2} />
                        <Input2 placeholder="Password" name="password" type="password" handleChange={handleChange2} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        { isLoading ? (
                            <Loader/>
                        ) : (
                            <button
                                type="button"

                                onClick={handleSubmit2}

                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Iniciar sesión
                            </button>
                        )}
                    </div>


                    <br />

                    <br /><br />
                </div>

            </div>








                <div
                     className= {`  flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10  ${visibilityVar} `}>

                    {currentAccount && (
                        <button
                            type="button"
                            onClick={disconnectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]" >
                            <AiFillPlayCircle className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                Cerrar sesión
                            </p>
                        </button>
                    )}



                    <div className="flex-1 flex flex-col    items-center bg-blue-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10    ">
                        <ServiceCard
                            color="bg-[#2952E3]"
                            title="Fondos disponibles:"
                            icon={<BsCashStack fontSize={21} className="text-white" />}
                            subtitle ={currentAccountBalance}

                        />

                    </div>





                    <div className="    p-3 flex justify-end items-start flex-col rounded-xl h-20 sm:w-64 w-full my-5 bg-blue-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ">
                        <div className="   flex justify-between flex-col w-full h-full">


                            <div className="flex justify-between items-start">
                                <div className="absolute w-12 h-12 top-4 rounded-full     flex justify-center items-center">

                                     <img src={uceCoinIcon} />
                                </div>

                            </div>


                            <div>

                                <p className="absolute top-4 right-12 text-white text-center font-light text-sm">

                                    {shortenAddress2(currentAccount)}
                                </p>
                                <p className="absolute top-8 right-5 text-white font-semibold text-center text-lg mt-1">
                                    Dirección de wallet
                                </p>
                            </div>
                        </div>
                    </div>



                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-blue-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">

                        <div className="App ">

                            <select className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-4 py-2.5 text-center inline-flex items-center" onChange={handleDropdownChange}>
                                <option className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow " value="Buscar destinatario">
                                    Buscar destinatario </option>

                                {


                                }
                                {allUserData.map((item) => <option value={item.name}>{item.name}</option>)}
                            </select>
                        </div>







                        <h3  className=" text-white text-capitalize text-center">Dirección: </h3>
                        <h3  className=" text-white text-capitalize text-center">  {shortenAddress2(receiverAccount)  }     </h3>
                        <Input placeholder="Cantidad (UCE)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Concepto" name="description" type="text" handleChange={handleChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        { isLoading ? (
                            <Loader/>
                        ) : (
                            <button
                                type="button"

                                onClick={handleSubmit}

                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                               Enviar UCE
                            </button>
                        )}
                    </div>

                    <br />
                    <br />
                </div>
            </div>



    );
};

export default Main;