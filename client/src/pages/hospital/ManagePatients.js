import React from 'react';
import { useSelector } from 'react-redux';
import PatientCard from '../../components/cards/PatientCard';
import { useParams } from 'react-router-dom';

const ManagePatients = () => {

    const { slug } = useParams();
    console.log(slug);

    const { user, hospital } = useSelector((state) => ({...state}));

    const patients = hospital && (slug==="ManagePatients" ? hospital.patients &&  hospital.patients.filter((patient)=> patient && patient.status==="Admitted") 
                                                : hospital.patients &&  hospital.patients.filter((patient)=> patient && patient.status!=="Admitted"));
    const type = slug==="ManagePatients" ? "ManagePatients" : "PatientsHistory";

    return(
        <div className="col-8 offset-1  p-md-4 p-3 text-center">
            {patients && patients.map((patient) => <PatientCard key={patient._id} patient={patient} type={type}/>)}
        </div>

    )
}

export default ManagePatients;