import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSlotCard from '../../components/cards/UserSlotCard';

const UserSlot = () => {

    let detailsArr = [];
    let hospitalDetails;
    let patientDetails;
    const [ActiveSlots, setActiveSlots] = useState([]);
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

        setActiveSlots(detailsArr && detailsArr.filter((d) => d && (d.status === "OnHold" || d.status === "Admitted")));
        setLoading(false);
    }

    useEffect(() =>{
        if(user && hospitals){
            data();
        }
    },[user, hospitals])


    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                {loading ? <h3>Loading...</h3> : ActiveSlots.length > 0 ? ActiveSlots.map((d) => d && <UserSlotCard key={d.patient && d.patient._id} hospital={d.hospital} patient={d.patient}/>) : <h3 className="text-center">No Active Slots</h3> }
            </div>
    );
};

export default UserSlot;
