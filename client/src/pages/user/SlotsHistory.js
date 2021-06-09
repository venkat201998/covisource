import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkHospital, getUser } from "../../functions/auth";
import UserSlotCard from '../../components/cards/UserSlotCard';
import { useHistory } from 'react-router-dom';

const SlotsHistory = () => {

    const { user } = useSelector((state) => ({...state}));
    const history = useHistory();
    const [activeUser, setActiveUser] = useState("");
    const [hospital, setHospital] = useState("");
    const [patientsHistory, setPatientsHistory] = useState([]);

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

    useEffect(()=>{
        setPatientsHistory([]);
        activeUser && activeUser.bookedSlots.map((details)=>{
            // console.log("bookedSlots: ", details);
            hospital && hospital.patients.map((patient)=>{
                // console.log("patient: ", patient);
                if(patient._id === details.patientId){
                    patientsHistory.push(patient);
                    setPatientsHistory(patientsHistory);
                }
            })
        })
        console.log(patientsHistory);
    },[hospital])
    

    
    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 shadow">
                
                <h4>Slots History</h4>
                <div className="row">
                    {
                        patientsHistory && patientsHistory.map((patient)=> <h5>Slot</h5>)
                    }
                    
                </div>
            </div>
    );
};

export default SlotsHistory;