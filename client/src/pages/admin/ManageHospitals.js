import React from 'react';
import { useSelector } from 'react-redux';
import HospitalCard from '../../components/cards/HospitalCard';

const ManageHospitals = () => {

    const { hospitals } = useSelector((state) => ({...state}));

    return(
        <div className="col-8 offset-1  p-md-4 p-3 text-center">
            {hospitals && hospitals.map((hospital) => <HospitalCard hospital={hospital}/>)}
        </div>
    )
}

export default ManageHospitals;