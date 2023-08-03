import React, { useContext }  from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/banner_1.png";
import { TransactionContext } from "../context/TransactionContext";


const NavBarItem = ({ title, classprops }) => (
    //list item
    <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
    //para que valga en moviles, se haga un boton que muestra una lista
    //desplegable con las opciones xD
    const [toggleMenu, setToggleMenu] = React.useState(false);


    const { currentUserDataArray } = useContext(TransactionContext);

   // currentUserDataArray =[];

  /* if (currentUserDataArray.name === undefined)
        {
            console.log("navbar: undefined" + currentUserDataArray);
            //currentUserDataArray.clear();
            setCurrentUserDataArray([]);
        }
        else {
            console.log("navbar: currentUserData name: " + currentUserDataArray.name);

             //currentUserDataArray.push( "Usuario:  " + currentUserData.name, "Rol:  " + currentUserData.accountType);
        }
*/

       // console.log("navbar: currentUserDataArray " + currentUserDataArray);



    return (
        //properties of tailwindcss
        <nav className="w-full flex  min-h-max background-blue-siiu-uce ">
            <div className=" relative  w-full ">
                <img src={logo} alt="logo" className="  h-40 w-full  " />

                <h1 className="absolute max-w-3xl text-white text-center top-12 left-1/4 text-4xl "> UNIVERSIDAD CENTRAL <br/> DEL ECUADOR</h1>



                <ul className="text-white md:flex hidden absolute text-center top-10 right-10 flex-col   text-3xl space-y-7  ">
                    {currentUserDataArray.map((item, index) => (
                        <NavBarItem key={item + index} title={item} />

                    ))}

            </ul>
            </div>


            <div className="flex relative">
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                )}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
                        {currentUserDataArray.map(
                            (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
                        )}






                    </ul>
                )}
            </div>
        </nav>
    );
};




export default Navbar;