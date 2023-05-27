import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SideNav from '../../components/sideNav/SideNav';
import { useParams, useHistory } from 'react-router-dom';
import { updatePatientStatus } from '../../functions/auth';
import UpdatePatientForm from '../../components/reusables/UpdatePatientForm';

const UpdatePatient = () =>{
    const { user, hospital } = useSelector((state) => ({ ...state }));
    const token = user && user.token;
    const dispatch = useDispatch();
    const { slug } = useParams();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [eFirstName, setEFirstName] = useState("");
    const [eLastName, setELastName] = useState("");
    const [relationship, setRelationship] = useState("");
    const [eContact, setEContact] = useState("");
    const [bedType, setBedType] = useState("");
    const [status, setStatus] = useState("");
    const [comments, setComments] = useState("");
    const [patientStatus, setPatientStatus] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [buttons, setButtons] = useState([{name: "Update", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"}]);


    useEffect(()=>{
        
        if(hospital){
            let patients = hospital && hospital.patients;
            let patientDetails = patients && patients.find((patient) => patient._id===slug);
            setFirstName(patientDetails && patientDetails.firstName);
            setLastName(patientDetails && patientDetails.lastName);
            setDob(patientDetails && patientDetails.dob);
            setGender(patientDetails && patientDetails.gender);
            setEmail(patientDetails && patientDetails.email);
            setContact(patientDetails && patientDetails.contact);
            setAddress(patientDetails && patientDetails.address);
            setState(patientDetails && patientDetails.state);
            setCity(patientDetails && patientDetails.city);
            setPinCode(patientDetails && patientDetails.pinCode);
            setMaritalStatus(patientDetails && patientDetails.maritalStatus);
            setEFirstName(patientDetails && patientDetails.eFirstName);
            setELastName(patientDetails && patientDetails.eLastName);
            setRelationship(patientDetails && patientDetails.relationship);
            setEContact(patientDetails && patientDetails.eContact);
            setBedType(patientDetails && patientDetails.bedType);
            setPatientStatus(patientDetails && patientDetails.status);
            setLoading(false);
        }

    },[user, hospital])

    const onChange = (e, id, value) => {
        switch(id){
            case 'firstName': setFirstName(value); break;
            case 'lastName': setLastName(value); break;
            case 'dob': setDob(value); break;
            case 'gender': setGender(value); break;
            case 'email': setEmail(value); break;
            case 'contact': setContact(value); break;
            case 'address': setAddress(value); break;
            case 'state': setState(value); break;
            case 'city': setCity(value); break;
            case 'pinCode': setPinCode(value); break;
            case 'maritalStatus': setMaritalStatus(value); break;
            case 'eFirstName': setEFirstName(value); break;
            case 'eLastName': setELastName(value); break;
            case 'relationship': setRelationship(value); break;
            case 'eContact': setEContact(value); break;
            case 'bedType': setBedType(value); break;
            case 'patientStatus': setStatus(value); break;
            case 'comments': setComments(value); break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const patientDetails = { eFirstName, eLastName, relationship, eContact, status, comments };
        let answer = window.confirm("Confirm Update?");
        if(answer){
            updatePatientStatus(patientDetails, slug, token)
            .then((res)=> {
                if(res.data!== "Update failed"){
                    dispatch({
                        type:'HOSPITAL',
                        payload: res.data.hospital 
                    })
                    toast.success("Patient updated");
                }
                if(history.location.pathname.includes('/Hospital/PatientsHistory/')){
                    history.push("/Hospital/PatientsHistory");
                }
                else{
                    history.push("/Hospital/ManagePatients");
                }
            
                
            })
            .catch((e)=> toast.error(e));
        }else{
            toast.error("Failed To Update Patient Details")
        }
    }

    return(
        <div className="container-fluid mt-5 px-md-5">
                <div className="row mt-5 pt-5 mx-md-2">
                    <SideNav/>
                    
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow border">
                            { loading ? <h3>Loading...</h3> : 
                            <div>
                                <h3>Update Patient</h3> 
                                <UpdatePatientForm data={{ firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, maritalStatus, eFirstName, eLastName, relationship, eContact, patientStatus, bedType, status, comments, disabled}} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit}/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePatient;