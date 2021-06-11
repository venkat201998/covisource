import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SideNav from '../../components/sideNav/SideNav';
import { useParams, useHistory } from 'react-router-dom';
import { checkHospital, updatePatientStatus } from '../../functions/auth';

const UpdatePatient = () =>{
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();
    const { slug } = useParams();
    const history = useHistory();

    const [Hospital, setHospital] = useState();

    // const patients =Hospital && Hospital.patients;
    
    let patientDetails={};

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dob, setDob] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [maritalStatus, setMaritalStatus] = useState();
    const [eFirstName, setEFirstName] = useState();
    const [eLastName, setELastName] = useState();
    const [relationship, setRelationship] = useState();
    const [eContact, setEContact] = useState();
    const [bedType, setBedType] = useState();
    const [status, setStatus] = useState();
    const [comments, setComments] = useState();
    const [patientStatus, setPatientStatus] = useState();


    useEffect(()=>{

        checkHospital(user.email)
        .then((res)=>{
            if(res.data!=="Hospital not registered"){
                setHospital(res.data);
                patientDetails = res.data.patients.find((patient)=> patient._id===slug);
                setFirstName(patientDetails.firstName);
                setLastName(patientDetails.lastName);
                setDob(patientDetails.dob);
                setGender(patientDetails.gender);
                setEmail(patientDetails.email);
                setContact(patientDetails.contact);
                setAddress(patientDetails.address);
                setState(patientDetails.state);
                setCity(patientDetails.city);
                setPinCode(patientDetails.pinCode);
                setMaritalStatus(patientDetails.maritalStatus);
                setEFirstName(patientDetails.eFirstName);
                setELastName(patientDetails.eLastName);
                setRelationship(patientDetails.relationship);
                setEContact(patientDetails.eContact);
                setBedType(patientDetails.bedType);
                setPatientStatus(patientDetails.status);
            }
            else toast.error(res.data);
        })
        .catch((e)=> console.log(e))
    },[user])
   

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
                        payload: res.data.hospital 
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
                    
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow border">

                                <h3>Update Patient</h3>
                                <form onSubmit={handleSubmit} className="container-fluid">
                        {/* ---------Personal details----------- */}    
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="patientName" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Patient Name</label>
                                        <div className="col-md-4 col-12 mb-3 mb-md-1">
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
                                        <div className="col-md-4 col-12 mb-3 mb-md-1">
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
                                        <label htmlFor="patientBirthDate" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Birth Date</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
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
                                        <label htmlFor="gender" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Gender</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                            <select className="w-100 h-100 form-select" id="gender" value={gender} disabled aria-label="Default select example" onChange={(e)=> setGender(e.target.value)}>
                                                <option value="sg">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="NA">N/A</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="contactNumber" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact Number</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
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
                                        <label htmlFor="email" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">E-mail</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
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
                                        <label htmlFor="streetAddress" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
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
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="streetAddress" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                                    <select className="w-100 h-100 form-select" aria-label="Default select example" disabled onChange={(e)=> setState(e.target.value) }>
                                                        <option value="ss">{state}</option>
                                                    </select>
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="streetAddress" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                                    <select className="w-100 h-100 form-select" aria-label="Default select example" disabled onChange={(e)=> setCity(e.target.value) }>
                                                        <option value="sc">{city}</option>
                                                    </select>
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="streetAddress" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
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
                                        <label htmlFor="maritalStatus" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Marital Status</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
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
                                        <label htmlFor="emergencyCName" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Emergency Contact</label>
                                        <div className="col-md-4 col-12 mb-3 mb-md-1">
                                            <input 
                                                id="emergencyCName"
                                                type="text" 
                                                className="form-control w-100"  
                                                name="EcfirstName"
                                                value={eFirstName}
                                                required
                                                placeholder="First Name"
                                                onChange={(e)=> setEFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4 col-12 mb-3 mb-md-1">
                                            <input
                                                id="emergencyCName" 
                                                type="text" 
                                                className="form-control w-100"  
                                                name="EclastName"
                                                value={eLastName}
                                                required
                                                placeholder="Last Name"
                                                onChange={(e)=> setELastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="relationship" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Relationship</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                            <input 
                                                id="relationship"
                                                type="text" 
                                                className="form-control w-100"  
                                                name="relationship"
                                                value={relationship}
                                                required
                                                onChange={(e)=> setRelationship(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="EContactNumber" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact Number</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                            <input 
                                                id="EContactNumber"
                                                type="tel" 
                                                className="form-control w-100"  
                                                name="EContactNumber"
                                                value={eContact}
                                                required
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
                                        <label htmlFor="bedType" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Bed Type</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                            <input 
                                                id="bedType"
                                                type="text" 
                                                className="form-control w-100"  
                                                name="bedType"
                                                value={bedType}
                                                required
                                                placeholder="Contact"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="patientStatus" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Update Status</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                            <select id="patientStatus" className="w-100 form-select" aria-label="Default select example" required onChange={(e)=> setStatus(e.target.value)}>
                                                <option value="">Select status</option>
                                                {patientStatus && patientStatus==="Admitted" ? 
                                                <><option value="Discharged">Discharged</option>
                                                <option value="Deceased">Deceased</option></> : <option value="Admitted">Admit</option>}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group my-xl-5 my-3 row">
                                        <label htmlFor="comments" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Status Message</label>
                                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                                            <textarea className="form-control" id="comments" placeholder="Comments" required value={comments} onChange={(e)=> setComments(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-center">
                                        <div className="col-lg-2 col-md-3 col-5">
                                            <button type="submit" className="btn btn-raised btn-outline-success fw-bold">Update</button>
                                        </div>
                                    </div>
                        
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
    )
}

export default UpdatePatient;