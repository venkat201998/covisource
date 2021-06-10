import { React } from "react";
import { useSelector } from "react-redux";
import UserSlotCard from '../../components/cards/UserSlotCard';

const SlotsHistory = () => {

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

    const HistorySlots = detailsArr && detailsArr.filter((d) => (d && d.patient) && (d.patient.status === "Discharged" || d.patient.status === "Deceased"));

    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                { HistorySlots.length > 0 ? HistorySlots.map((d) => <UserSlotCard hospital={d.hospital} patient={d.patient}/>): <h3 className="text-center">No Slots History</h3> }
            </div>
    );
};

export default SlotsHistory;
