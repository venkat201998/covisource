import { React } from "react";
import { useSelector } from "react-redux";
import UserSlotCard from '../../components/cards/UserSlotCard';

const UserSlot = () => {

    let detailsArr = [];
    let hospitalDetails;
    let patientDetails;
    const { user, hospitals } = useSelector((state) => ({...state}));
    const slots = user && user.slots;
    slots && slots.map((slot) => {
        hospitalDetails = hospitals && hospitals.find((h) => h.email === slot.hospitalEmail);
        patientDetails = (hospitalDetails && hospitalDetails.patients) && hospitalDetails.patients.find((p) => p.email === slot.patientEmail);
        detailsArr.push({
            hospital: hospitalDetails,
            patient: patientDetails
        })
    })

    const ActiveSlots = detailsArr && detailsArr.filter((d) => (d && d.patient) && (d.patient.status === "OnHold" || d.patient.status === "Admitted"));



    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                { ActiveSlots.length > 0 ? ActiveSlots.map((d) => <UserSlotCard hospital={d.hospital} patient={d.patient}/>) : <h3 className="text-center">No Active Slots</h3> }
            </div>
    );
};

export default UserSlot;
