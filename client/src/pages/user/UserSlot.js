import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import UserSlotCard from '../../components/cards/UserSlotCard';

const UserSlot = () => {

    let detailsArr = [];
    let hospitalDetails;
    let patientDetails;
    let ActiveSlots =[];
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

        ActiveSlots = detailsArr && detailsArr.filter((d) => d && (d.status === "OnHold" || d.status === "Admitted"));
    }

    useEffect(() =>{
        data();
    },[user, hospitals])
    data();


    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                { ActiveSlots.length > 0 ? ActiveSlots.map((d) => <UserSlotCard hospital={d.hospital} patient={d.patient}/>) : <h3 className="text-center">No Active Slots</h3> }
            </div>
    );
};

export default UserSlot;
