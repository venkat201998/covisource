import React from 'react';
import { useSelector } from 'react-redux';
import PatientCard from '../../components/cards/PatientCard';
import { useParams } from 'react-router-dom';

const ManagePatients = () => {

    const { slug } = useParams();

    const { user, hospital } = useSelector((state) => ({...state}));

    const patients = hospital && (slug==="ManagePatients" ? hospital.patients &&  hospital.patients.filter((patient)=> patient && patient.status==="Admitted") 
                                                : hospital.patients &&  hospital.patients.filter((patient)=> patient && patient.status!=="Admitted"));
    const type = slug==="ManagePatients" ? "ManagePatients" : "PatientsHistory";

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center">
            {patients && patients.length > 0 ? (patients.map((patient) => <PatientCard key={patient._id} patient={patient} type={type}/>)) 
                                    : type === "ManagePatients" ? <h3>No Active Patients</h3> 
                                                                    : <h3>No Patients History</h3>}
        </div>

    )
}

export default ManagePatients;