import React from 'react';
import { useSelector } from 'react-redux';
import PatientCard from '../../components/cards/PatientCard';

const ManagePatients = () => {

    const { hospital } = useSelector((state) => ({...state}));

    return(
        <div className="col-8 offset-1  p-md-4 p-3 text-center">
            {hospital && hospital.data.patients.map((patient) => <PatientCard patient={patient}/>)}
        </div>

    )
}

export default ManagePatients;