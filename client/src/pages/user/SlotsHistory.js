import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSlotCard from '../../components/cards/UserSlotCard';

const SlotsHistory = () => {

    let detailsArr = [];
    let hospitalDetails;
    let patientDetails;
    const [historySlots, setHistorySlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, hospitals } = useSelector((state) => ({...state}));

    const data = () =>{
        const slots = user && user.slots;
        slots && slots.map((slot) => {
        hospitalDetails = hospitals && hospitals.find((h) => h.email === slot.hospitalEmail);
        patientDetails = (hospitalDetails && hospitalDetails.patients) && (hospitalDetails.patients.find((p) => p.email === slot.patientEmail));
        detailsArr.push({
            hospital: hospitalDetails,
            patient: patientDetails,
            status: slot.slotStatus
        })
        
    })
        setHistorySlots(detailsArr && detailsArr.filter((d) => d && (d.status === "Discharged" || d.status === "Deceased" || d.status === "Rejected")));
        setLoading(false);
    }
    
    useEffect(() =>{
        if(user && hospitals){
            data();
        }
    },[user, hospitals])
    
    

    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                {loading ? <h3>Loading...</h3> : historySlots.length > 0 ? historySlots.map((d) => d && <UserSlotCard key={d.patient && d.patient._id} hospital={d.hospital} patient={d.patient}/>): <h3 className="text-center">No Slots History</h3> }
            </div>
    );
};

export default SlotsHistory;
