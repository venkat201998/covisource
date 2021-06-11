import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import PatientCard from '../../components/cards/PatientCard';
import { useParams } from 'react-router-dom';

const ManagePatients = () => {

    const { slug } = useParams();

    const { user, hospital } = useSelector((state) => ({...state}));

    const [ firstName, setFirstName ] = useState("");

    const handleSearchPatient = (e) => {
        e.preventDefault();
        setFirstName(e.target.value);
    }

    const capitalize = (s) => {
        return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
    };

    const searchPatient = (firstName) => (c) => c && c.firstName.includes(capitalize(firstName));

    const patients = hospital && (slug==="ManagePatients" ? hospital.patients &&  hospital.patients.filter((patient)=> patient && patient.status==="Admitted") 
                                                : hospital.patients &&  hospital.patients.filter((patient)=> patient && (patient.status!=="Admitted" && patient.status!=="OnHold")));
    const type = slug==="ManagePatients" ? "ManagePatients" : "PatientsHistory";

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
            <div className="row justify-content-center mx-lg-4 mx-md-0 mx-1">
                <div className="col-md-6 col-12 text-center text-md-start p-0">
                    {type && type === "ManagePatients" ? <h3>Manage Patients</h3> : <h3>Patients History</h3>}
                </div>
                <div className="col-md-6 col-12 p-0">
                    <input type="search" placeholder="Patient FirstName" value={firstName} onChange={handleSearchPatient} className="form-control"/>
                </div>
            </div>
            {patients && patients.length > 0 ? (patients.filter(searchPatient(firstName)).map((patient) => <PatientCard key={patient._id} patient={patient} type={type}/>)) 
                                    : type === "ManagePatients" ? <h5 className="text-center m-5">No Active Patients</h5> 
                                                                    : <h5 className="text-center m-5">No Patients History</h5>}
        </div>

    )
}

export default ManagePatients;