import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkHospital, getUser } from "../../functions/auth";
import UserSlotCard from '../../components/cards/UserSlotCard';

const UserSlot = () => {

    const { user } = useSelector((state) => ({...state}));


    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                {/* <UserSlotCard hospital={hospital} patient={patient}/> */}

            </div>
    );
};

export default UserSlot;
