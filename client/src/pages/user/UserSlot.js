import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkHospital, getUser } from "../../functions/auth";
import UserSlotCard from '../../components/cards/UserSlotCard';

const UserSlot = () => {

    const { user } = useSelector((state) => ({...state}));
    const [activeUser, setActiveUser] = useState("");
    const [hospital, setHospital] = useState("");
    const patients = hospital && hospital.patients;
    const patient = patients && patients.find((patient)=> patient.email=== (activeUser && activeUser.currentSlot.patientEmail));
    
    useEffect(()=>{
        getUser(user.email, user.token)
        .then((res)=>{
            if(res.data!=="User Not found"){
                // console.log("user:", res.data)
                setActiveUser(res.data);
            }
        })
        .catch((e)=> console.log(e))
    },[user])

    useEffect(()=>{
        checkHospital(activeUser && activeUser.currentSlot.hospitalEmail)
        .then((res)=>{
            if(res.data!=="Hospital not registered"){
                // console.log("hospital", res.data)
                setHospital(res.data);
            }
        })
    },[activeUser])
    // console.log("patient", patient);

    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                <UserSlotCard hospital={hospital} patient={patient}/>

            </div>
    );
};

export default UserSlot;
