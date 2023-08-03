import React , { useContext }from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { TransactionContext } from "../context/TransactionContext";

import minga from "../../images/mingas.png";
import logo from "../../images/logo.png";

const ServiceCard = ({ color, title, icon, subtitle,subtitle2, subtitle3 }) => (
    <div className="flex flex-row justify-start items-start white-glassmorphism  w-10/12   m-2 cursor-pointer  ">
        <div className={`w-24 h-12 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className=" flex flex-col  ">
            <h1 className=" text-white font-semibold text-center text-2xl">{title}</h1>

            <h2 className="  text-white text-center font-bold mx-6 text-5xl md:w-9/12">
                {subtitle}
            </h2>

          <br/>

            <h1 className=" text-white  text-center text-2xl  ">
                Por un valor de:

            </h1>
            <p className="mt-1 text-white text-center font-bold  mx-6 text-5xl   md:w-9/12">
                 {subtitle2}

            </p>

            <p className="mt-1 text-white text-center font-bold  mx-6 text-xl   md:w-9/12">
                 UCE Coin

            </p>
            <br />





        </div>
    </div>
);

const Metrics = () => {

const {
    volunteerActivitiesCount,
    volunteerActivitiesAmount,
    discountCount,
    discountAmount,
    UCEResourcesCount,
    UCEResourcesAmount} = useContext(TransactionContext);



    return (
<div className="flex w-full justify-center items-center gradient-bg-services-blue">


        <div>
            <img className=" h-auto max-w-full object-cover ml-10   items-center mx-6" src={minga}  />
        </div>

        <div className="flex mf:flex-row flex-col items-center justify-center md:p-4 py-2 px-6">
            <div className="flex-1 flex flex-col justify-center text-center items-start">


                <div>
                    <img className="   h-auto max-w-full  items-center mx-80   " src={logo}  />
                </div>

                <p className="text-center text-white font-light text-2xl md:w-10/12  ml-20 my-3   ">
                    Mostramos el uso global que le ha dado la comunidad universitaria a la herramienta.
                </p>
            </div>







            <div className="flex-1 flex flex-row  items-center ml-10">
                <ServiceCard
                    color="bg-[#2952E3]"
                    title="Actividades de voluntariado realizadas:"
                    icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
                    subtitle ={volunteerActivitiesCount}
                    subtitle2 ={volunteerActivitiesAmount}
                />
                <ServiceCard
                    color="bg-[#8945F8]"
                    title="Recursos universitarios entregados:"
                    icon={<BiSearchAlt fontSize={21} className="text-white" />}
                    subtitle ={UCEResourcesCount}
                    subtitle2={UCEResourcesAmount}
                />
                <ServiceCard
                    color="bg-[#F84550]"
                    title="Descuentos a estudiantes realizados:                "
                    icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                    subtitle = {discountCount}
                    subtitle2={discountAmount}
                />
            </div>
        </div>
    </div>
);


};

export default Metrics;;