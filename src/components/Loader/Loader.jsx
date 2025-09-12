import React from "react";
import css from "./Loader.module.css"
import { ClockLoader } from "react-spinners"


const Loader = ({ color = "#101828" }) => {

    return (
        <div className={css.wrap}>
            <ClockLoader size={100} color={color} />
        </div>
    )
}

export default Loader