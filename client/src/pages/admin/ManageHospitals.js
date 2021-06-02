import React from 'react';
import { useSelector } from 'react-redux';
import HospitalCard from '../../components/cards/HospitalCard';

const ManageHospitals = () => {

    const { hospitals } = useSelector((state) => ({...state}));

    return(
        <div className="container-fluid">
            <div className="row">
                {hospitals && hospitals.map((hospital) => <HospitalCard hospital={hospital}/>)}
            </div>
        </div>
    )
}

export default ManageHospitals;