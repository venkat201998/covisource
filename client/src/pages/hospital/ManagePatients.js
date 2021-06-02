import React from 'react';
import { useSelector } from 'react-redux';
import PatientCard from '../../components/cards/PatientCard';

const ManagePatients = () => {

    const { hospital } = useSelector((state) => ({...state}));

    return(
        <div className="container-fluid">
            <div className="row">
                {hospital && hospital.data.patients.map((patient) => <PatientCard patient={patient}/>)}
            </div>
        </div>
    )
}

export default ManagePatients;