import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HospitalCities from './Json/HospitalCities.json';
import HospitalStates from './Json/HospitalStates.json';
import { toast } from 'react-toastify';
import SideNav from '../../components/sideNav/SideNav';
import { useParams, useHistory } from 'react-router-dom';
import { updatePatientStatus } from '../../functions/auth';

const UpdatePatient = () =>{
    const { user, hospital } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();
    const { slug } = useParams();
    const history = useHistory();

    const patients =hospital && hospital.patients;
    
    const patientDetails = patients && patients.find((patient)=> patient._id===slug);

    const [firstName, setFirstName] = useState( patientDetails && patientDetails.firstName);
    const [lastName, setLastName] = useState( patientDetails && patientDetails.lastName);
    const [dob, setDob] = useState( patientDetails && patientDetails.dob);
    const [gender, setGender] = useState( patientDetails && patientDetails.gender);
    const [email, setEmail] = useState( patientDetails && patientDetails.email);
    const [contact, setContact] = useState( patientDetails && patientDetails.contact);
    const [address, setAddress] = useState( patientDetails && patientDetails.address);
    const [state, setState] = useState( patientDetails && patientDetails.state);
    const [city, setCity] = useState( patientDetails && patientDetails.city);
    const [pinCode, setPinCode] = useState( patientDetails && patientDetails.pinCode);
    const [maritalStatus, setMaritalStatus] = useState( patientDetails && patientDetails.maritalStatus);
    const [eFirstName, setEFirstName] = useState( patientDetails && patientDetails.eFirstName);
    const [eLastName, setELastName] = useState( patientDetails && patientDetails.eLastName);
    const [relationship, setRelationship] = useState( patientDetails && patientDetails.relationship);
    const [eContact, setEContact] = useState( patientDetails && patientDetails.eContact);

    const [status, setStatus] = useState("Admitted");
    const [comments, setComments] = useState("");
    let citiesOptions = null;

    HospitalCities.map((item)=>{
        if(item.state===state)
        citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const patientDetails = { eFirstName, eLastName, relationship, eContact, status, comments };
        let answer = window.confirm("Confirm Update?");
        if(answer){
            updatePatientStatus(patientDetails, slug, user.token)
            .then((res)=> {
                if(res.data!== "Update failed"){
                    dispatch({
                        type:'LOGIN',
                        payload: res.data 
                    })
                    toast.success("Patient updated");
                }
            history.push("/Hospital/ManagePatients");
                
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
                    
                    <div className="col-8 offset-1  p-md-4 p-3 text-center shadow">

                        <h3>Update Patient</h3>
                        <form onSubmit={handleSubmit}>
                {/* ---------Personal details----------- */}    
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="patientName" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Patient Name</label>
                                <div className="col-12 mb-3 mb-md-0 col-md-6 col-xl-4">
                                    <input 
                                        id="patientName"
                                        type="text" 
                                        className="form-control w-100"  
                                        name="firstName"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={(e)=> setFirstName(e.target.value)}
                                        disabled
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-xl-4">
                                    <input 
                                        id="patientName"
                                        type="text" 
                                        className="form-control w-100"  
                                        name="lastName"
                                        value={lastName}
                                        placeholder="Last Name"
                                        onChange={(e)=> setLastName(e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="patientBirthDate" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Birth Date</label>
                                <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                    <input 
                                        id="patientBirthDate"
                                        type="date" 
                                        className="form-control w-100"  
                                        name="patientBirthDate"
                                        value={dob}
                                        placeholder="Date of Birth"
                                        onChange={(e)=> setDob(e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="gender" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Gender</label>
                                <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                    <select className="w-100 h-100 form-select" id="gender" value={gender} disabled aria-label="Default select example" onChange={(e)=> setGender(e.target.value)}>
                                        <option value="sg">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="NA">N/A</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="contactNumber" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Contact Number</label>
                                <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                    <input 
                                        id="contactNumber"
                                        type="tel" 
                                        className="form-control w-100"  
                                        name="contactNumber"
                                        value={contact}
                                        placeholder="Contact"
                                        onChange={(e)=> setContact(e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="email" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">E-mail</label>
                                <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                    <input 
                                        id="email"
                                        type="email" 
                                        className="form-control w-100"  
                                        name="email"
                                        value={email}
                                        placeholder="example@example.com"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        disabled

                                    />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="streetAddress" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Address</label>
                                <div className="col-12 mb-3 mb-md-0 col-xl-8">
                                    <input 
                                        id="streetAddress"
                                        type="text" 
                                        className="form-control w-100 mb-3 mb-xl-0"  
                                        name="streetAddress"
                                        value={address}
                                        placeholder="Street address"
                                        onChange={(e)=> setAddress(e.target.value)}
                                        disabled
                                    />
                                    <div className="row my-xl-3 my-2">
                                        <div className="col-12 col-xl-6 mb-3 mb-xl-0">
                                            <select className="w-100 h-100 form-select" aria-label="Default select example" disabled onChange={(e)=> setState(e.target.value) }>
                                                <option value="ss">{state}</option>
                                                { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                            </select>
                                        </div>
                                        <div className="col-12 col-xl-6 mb-3 mb-xl-0">
                                            <select className="w-100 h-100 form-select" aria-label="Default select example" disabled onChange={(e)=> setCity(e.target.value) }>
                                                <option value="sc">{city}</option>
                                                    {citiesOptions}
                                            </select>
                                        </div>
                                    </div>
                                    <input 
                                        type="text"
                                        inputMode="numeric"
                                        className="form-control col-12 col-xl-8"  
                                        value={pinCode}
                                        pattern="[0-9]{6}" 
                                        maxLength="6"
                                        placeholder="pin code"
                                        onChange={(e) => setPinCode(e.target.value)}
                                        disabled
                                        />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="maritalStatus" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Marital Status</label>
                                <div className="col-12 col-xl-6">
                                    <select id="maritalStatus" className="w-100 h-100 form-select" aria-label="Default select example" disabled onChange={(e)=> setMaritalStatus(e.target.value) }>
                                        <option value="ss">{maritalStatus}</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="separated">Legally separated</option>
                                        <option value="widowed">Widowed</option>
                                    </select>
                                </div>
                            </div>
                {/* ---------Emergency Fields----------- */}
                            <div className="row border-top border-3 pt-3 fs-4" >
                                <div className="col text-center">
                                    <h4 style={{color: "gray", borderColor: "gray"}}>In Case of Emergency</h4>
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="emergencyCName" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Emergency Contact</label>
                                <div className="col-12 mb-3 mb-md-0 col-md-6 col-xl-4">
                                    <input 
                                        id="emergencyCName"
                                        type="text" 
                                        className="form-control w-100"  
                                        name="EcfirstName"
                                        value={eFirstName}
                                        placeholder="First Name"
                                        onChange={(e)=> setEFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-xl-4">
                                    <input
                                        id="emergencyCName" 
                                        type="text" 
                                        className="form-control w-100"  
                                        name="EclastName"
                                        value={eLastName}
                                        placeholder="Last Name"
                                        onChange={(e)=> setELastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="relationship" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Relationship</label>
                                <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                    <input 
                                        id="relationship"
                                        type="text" 
                                        className="form-control w-100"  
                                        name="relationship"
                                        value={relationship}
                                        onChange={(e)=> setRelationship(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="EContactNumber" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Contact Number</label>
                                <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                    <input 
                                        id="EContactNumber"
                                        type="tel" 
                                        className="form-control w-100"  
                                        name="EContactNumber"
                                        value={eContact}
                                        placeholder="Contact"
                                        onChange={(e)=> setEContact(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row border-top border-3 pt-3 fs-4" >
                                <div className="col text-center">
                                    <h4 style={{color: "gray", borderColor: "gray"}}>Patient Status</h4>
                                </div>
                            </div>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="patientStatus" className="col-6 col-md-3 col-form-label text-start text-xl-end fw-bold fs-6">Update Status</label>
                                <div className="col-6 col-md-3">
                                    <select ud="patientStatus" className="w-100 form-select" aria-label="Default select example" onChange={(e)=> setStatus(e.target.value)}>
                                        <option value="ss">Select status</option>
                                        <option value="Discharged">Discharged</option>
                                        <option value="Deceased">Deceased</option>
                                    </select>
                                </div>
                                <div className="col-6 col-md-3">
                                    <textarea className="form-control" placeholder="Comments" required value={comments} onChange={(e)=> setComments(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="form-group mx-auto my-md-5 my-3 d-flex flex-col px-lg-2 justify-content-center">
                                <div className="col-2">
                                    <button type="submit" className="btn btn-raised btn-outline-info w-100 mx-auto">Update</button>
                                </div>
                            </div>
                
                        </form>
                    </div>
                </div>
             </div>
    )
}

export default UpdatePatient;