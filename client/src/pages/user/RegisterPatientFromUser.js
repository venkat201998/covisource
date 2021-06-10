import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HospitalCities from '../hospital/Json/HospitalCities.json';
import HospitalStates from '../hospital/Json/HospitalStates.json';
import { registerPatientFromUser, getHospitals, currentUser } from '../../functions/auth';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

const RegisterPatientFromUser = () =>{

    const { user } = useSelector((state) => ({ ...state }))
    const { slug }  = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [hospital, setHospital] = useState("");
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
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [medicationStatus, setMedicationStatus] = useState("");
    const [medicationList, setMedicationList] = useState("");
    const [medicationAllergies, setMedicationAllergies] = useState("");
    const [operationsList, setOperationsList] = useState("");
    const [status, setStatus] = useState("OnHold");
    const [bedType, setBedType] = useState("");
    let [healthIssuesChecked, setHealthIssuesChecked] = useState([]);
    let [covidSymptomsChecked, setCovidSymptomsChecked] = useState([]);

    useEffect(()=>{

        currentUser(user.token)
        .then((res) => {
            if(res.data!=="User not found"){
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setDob(res.data.dob);
                setGender(res.data.gender);
                setEmail(res.data.email);
                setContact(res.data.contact);
                setAddress(res.data.address);
                setState(res.data.state);
                setCity(res.data.city);
                setPinCode(res.data.pinCode);
            }
        })

        getHospitals()
        .then((res)=>{
            setHospital(res.data.find((r)=> r._id===slug));
        })

    },[user])


    const inputChecked= false;
    let healthIssues=[];
    let covidSymptoms=[];
    let citiesOptions = null;

    const healthList = [ "Anemia", "Asthma", "Arthritis", "Cancer", "Diabetes", "Epilepsy Seizures", "Gallstones", "Heart Disease", "Heart Attack", "Rheumatic Fever",
                         "Blood Pressure", "Digestive Problems", "Ulcerative Colitis", "Ulcer Disease","Hepatitis", "Kidney Disease", "Liver Disease", "Sleep Apnea",
                         "Thyroid Problems", "Tuberculosis", "Venereal Disease", "Emphysema", "Bleeding Disorders", "Lung Disease"];

    const covidSymptomsList = [ "High Fever", "Cough", "Difficulty in breathing", "Pain or pressure in chest",
                                "Body aches", "Nasal congestion", "Runny nose", "Sore throat", "Diarrhea", "Other"];

    HospitalCities.map((item)=>{
        if(item.state===state)
        citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const checkListHandler = (e) =>{
        if(e.target.id==="healthIssues"){
            if(healthIssues[e.target.value]===true){
                healthIssues[e.target.value]=false;
                healthIssuesChecked = healthIssuesChecked.filter((item)=> item!== e.target.value);
                setHealthIssuesChecked(healthIssuesChecked);
            }
            else if (healthIssues[e.target.value]===false){
                healthIssues[e.target.value]=true;
                healthIssuesChecked.push(e.target.value);
                setHealthIssuesChecked(healthIssuesChecked);
            }
            else{
                healthIssues[e.target.value] = !inputChecked;
                healthIssuesChecked.push(e.target.value);
                setHealthIssuesChecked(healthIssuesChecked);
            }
        }
        else{
            if(covidSymptoms[e.target.value]===true){
                covidSymptoms[e.target.value]=false;
                covidSymptomsChecked = covidSymptomsChecked.filter((item)=> item!== e.target.value);
                setCovidSymptomsChecked(covidSymptomsChecked);
            }
            else if (covidSymptoms[e.target.value]===false){
                covidSymptoms[e.target.value]=true;
                covidSymptomsChecked.push(e.target.value);
                setCovidSymptomsChecked(covidSymptomsChecked);
            }
            else{
                covidSymptoms[e.target.value] = !inputChecked;
                covidSymptomsChecked.push(e.target.value);
                setCovidSymptomsChecked(covidSymptomsChecked);
            }
        }
    }
     
    const resetData = () => {
        setFirstName(""); setLastName(""); setDob(""); setGender(""); setEmail(""); setContact("");
        setAddress(""); setState(""); setCity(""); setPinCode(""); setMaritalStatus("");
        setEFirstName(""); setELastName(""); setRelationship(""); setEContact("");
        setWeight(""); setHeight(""); setMedicationStatus(""); setMedicationList(""); 
        setMedicationAllergies(""); setOperationsList(""); setHealthIssuesChecked([]); setCovidSymptomsChecked([]);
    }

    const handleSubmit = (e) => {
        const bookedBy = user.email;
        e.preventDefault();
        const patientDetails = { bookedBy, firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, maritalStatus, 
                                eFirstName, eLastName, relationship, eContact, weight, height, medicationStatus, medicationList, 
                                medicationAllergies, operationsList, healthIssuesChecked, covidSymptomsChecked, bedType, status};
        let answer = window.confirm("Confirm Registration?");
        if(answer){
            registerPatientFromUser(patientDetails, slug, user.token)
            .then((res)=> {
                if(res.data==="Patient Already registered with these details" || res.data==="Hospital Not Registered" || res.data==="Failed To Update Hospital" || res.data==="User Not Registered" || res.data==="Failed To Update User"){
                    toast.error(res.data);
                }
                else{
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            dob: res.data.dob,
                            gender:res.data.gender,
                            email:res.data.email,
                            contact: res.data.contact,
                            address: res.data.address,
                            state: res.data.state,
                            city:res.data.city,
                            pinCode: res.data.pinCode,      
                            type: res.data.type,
                            _id: res.data._id,
                            options: ['Dashboard','SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'],
                            slots: res.data.slots,
                            token: res.config.headers.idToken
                        }
                    });
                    dispatch({
                        type: "LOGIN",
                        payload: res.data.hospital
                    });
                    dispatch({
                        type: "ACTIVE_HOSPITALS",
                        payload: res.data.hospitals
                    })
                    toast.success("Patient Registered");
                    history.push("/User/Dashboard");
                }
            })
            .catch((e)=> toast.error(e));
        }else{
            toast.error("Failed To Register")
        }
    }

    const handleReset = (e) => {
            let answer = window.confirm("Reset Form?");
            if(answer){
                resetData();
            }else{
                toast.error("Failed To Reset Form");
            }
    }

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
                <h3>Patient Registration Form</h3>
                <form onSubmit={handleSubmit} onReset={handleReset} className="container-fluid">
        {/* ---------Personal details----------- */}    
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="patientName" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Patient Name</label>
                        <div class="col-md-4 col-12 mb-3 mb-md-1">
                            <input 
                                type="text" 
                                id="patientName"
                                className="form-control w-100"  
                                name="firstName"
                                value={firstName}
                                required
                                placeholder="First Name"
                                onChange={(e)=> setFirstName(e.target.value)}
                                
                            />
                        </div>
                        <div class="col-md-4 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="patientName" 
                                className="form-control w-100"  
                                name="lastName"
                                value={lastName}
                                required
                                placeholder="Last Name"
                                onChange={(e)=> setLastName(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="patientBirthDate" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Birth Date</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="date"
                                id="patientBirthDate" 
                                className="form-control w-100"  
                                name="patientBirthDate"
                                value={dob}
                                required
                                placeholder="Date of Birth"
                                onChange={(e)=> setDob(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="gender" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Gender</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <select class="w-100 h-100 form-select" id="gender" value={gender} aria-label="Default select example" onChange={(e)=> setGender(e.target.value)}>
                                <option value="sg">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="NA">N/A</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="contactNumber" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact Number</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="tel" 
                                id="contactNumber"
                                className="form-control w-100"  
                                name="contactNumber"
                                value={contact}
                                required
                                placeholder="Contact Number"
                                onChange={(e)=> setContact(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="email" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">E-mail</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="email"
                                id="email" 
                                className="form-control w-100"  
                                name="email"
                                value={email}
                                required
                                placeholder="example@example.com"
                                onChange={(e)=> setEmail(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="streetAddress" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="streetAddress"
                                className="form-control w-100 mb-3 mb-xl-0"  
                                name="streetAddress"
                                value={address}
                                required
                                placeholder="Street address"
                                onChange={(e)=> setAddress(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="state" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                                <select class="w-100 h-100 form-select" id="state" aria-label="Default select example" value={state} onChange={(e)=> setState(e.target.value) }>
                                    <option value="ss">Select State</option>
                                    { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                </select>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="city" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                                <select class="w-100 h-100 form-select" id="city" aria-label="Default select example" value={city} onChange={(e)=> setCity(e.target.value) }>
                                    <option value="sc">Select City</option>
                                    {citiesOptions}
                                </select>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="pincode" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="pincode"
                                inputMode="numeric"
                                className="form-control col-12 col-xl-8"  
                                value={pinCode}
                                required
                                pattern="[0-9]{6}" 
                                maxLength="6"
                                placeholder="Pin Code"
                                onChange={(e) => setPinCode(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div className="form-group my-xl-5 my-3 row">
                        <label htmlFor="maritalStatus" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Marital Status</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <select class="w-100 h-100 form-select" id="maritalStatus" aria-label="Default select example" onChange={(e)=> setMaritalStatus(e.target.value) }>
                                <option value="ss">Select status</option>
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
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="emergencyCName" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Emergency Contact</label>
                        <div class="col-md-4 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="emergencyCName" 
                                className="form-control w-100"  
                                name="EcfirstName"
                                value={eFirstName}
                                required
                                placeholder="First Name"
                                onChange={(e)=> setEFirstName(e.target.value)}
                                
                            />
                        </div>
                        <div class="col-md-4 col-12 mb-3 mb-md-1">
                            <input 
                                type="text" 
                                id="emergencyCName"
                                className="form-control w-100"  
                                name="EclastName"
                                value={eLastName}
                                required
                                placeholder="Last Name"
                                onChange={(e)=> setELastName(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="relationship" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Relationship</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="relationship" 
                                className="form-control w-100"  
                                name="relationship"
                                value={relationship}
                                required
                                placeholder="Relationship"
                                onChange={(e)=> setRelationship(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="EContactNumber" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact Number</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="tel"
                                id="EContactNumber"
                                className="form-control w-100"  
                                name="EContactNumber"
                                value={eContact}
                                required
                                placeholder="Contact Number"
                                onChange={(e)=> setEContact(e.target.value)}
                                
                            />
                        </div>
                    </div>
        {/* ---------Health & medical history----------- */}
                    <div className="row border-top border-3 pt-3 fs-4" >
                        <div className="col text-center">
                            <h4 style={{color: "gray", borderColor: "gray"}}>Health and Medical History</h4>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="weight" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Weight</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="weight"
                                className="form-control w-100"  
                                name="weight"
                                value={weight}
                                required
                                placeholder="Weight (KG)"
                                onChange={(e)=> setWeight(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">  
                        <label htmlFor="height" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Height</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <input 
                                type="text"
                                id="height"
                                inputMode="numeric"
                                className="form-control w-100"
                                name="height"
                                value={height}
                                required  
                                placeholder="Height (CM)"
                                onChange={(e)=> setHeight(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="medication" className="col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6">
                            Are you currently taking any medication?
                        </label>
                        <div class="col-md-8 col-12 mt-0 mt-xl-3 text-start" id="medication">
                            <input type="radio" name="medication" className="col-md-1 col-2" id="Yes" value="Yes" onChange={(e)=> setMedicationStatus(e.target.value)}/>
                            <label htmlFor="Yes" className="col-md-2 col-10">Yes</label>

                            <input type="radio" name="medication" className="col-md-1 col-2" id="No" value="No" onChange={(e)=> setMedicationStatus(e.target.value)}/>
                            <label htmlFor="No" className="col-md-2 col-10">No</label>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">     
                        <label htmlFor="medicationList" class="col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6">
                            If yes, please list it here...
                        </label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <textarea 
                                className="form-control"
                                id="medicationList"
                                value={medicationList}
                                onChange={(e)=> setMedicationList(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label htmlFor="allergies" className="col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6">
                            Do you have any medication allergies
                        </label>
                        <div class="col-md-8 col-12 mt-0 mt-xl-3 text-start" id="allergies">
                            <input type="radio" name="allergies" className="col-md-1 col-2" id="Yes" value="Yes" onChange={(e)=> setMedicationAllergies(e.target.value)}/>
                            <label htmlFor="Yes" className="col-md-2 col-10">Yes</label>

                            <input type="radio" name="allergies" className="col-md-1 col-2" id="No" value="No" onChange={(e)=> setMedicationAllergies(e.target.value)}/>
                            <label htmlFor="No" className="col-md-2 col-10">No</label>

                            <input type="radio" name="allergies" className="col-md-1 col-2" id="Not Sure" value="Not Sure" onChange={(e)=> setMedicationAllergies(e.target.value)}/>
                            <label htmlFor="Not Sure" className="col-md-3 col-10">Not sure</label>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">     
                        <label htmlFor="operations" class="col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6">
                            Please list any operations and dates of each
                        </label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <textarea 
                                className="form-control"
                                id="operations"
                                value={operationsList}
                                onChange={(e)=> setOperationsList(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">     
                        <label htmlFor="healthIssues" class="col-md-3 col-12 col-form-label text-md-end text-start fw-bold fs-6">
                            Have you ever had <br/>
                            ( Please check all that apply...)
                        </label>
                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                            <div className="row my-2">
                                { healthList.map((item, i)=>{
                                    return(
                                        <div className="col-12 col-md-6 mb-2">
                                            <input className="col-2 m-auto" type="checkbox" id="healthIssues" key={item} defaultChecked={inputChecked} value={item} onClick={checkListHandler} />
                                            <label className="col-10 m-auto text-start">{item}</label>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
        {/* ---------Covid Symptoms----------- */}
                    <div className="row border-top border-3 pt-3 fs-4" >
                        <div className="col text-center">
                            <h4 style={{color: "gray", borderColor: "gray"}}>Covid-19 Questionnaire</h4>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">     
                        <label htmlFor="covidSymptoms" class="col-md-3 d-none d-md-block col-form-label text-md-end text-start fw-bold fs-6">
                            Please check the symptoms that apply...
                        </label>
                        <div className="col-md-8 col-12 mb-3 mb-md-1">
                            <div className="row my-2">
                                { covidSymptomsList.map((item, i)=>{
                                    return(
                                        <div className="col-12 col-md-6 mb-2">
                                            <input className="col-2 m-auto" type="checkbox" id="covidSymptoms" key={item} defaultChecked={inputChecked} value={item} onClick={checkListHandler}/>
                                            <label className="col-10 m-auto text-start">{item}</label>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-group my-xl-5 my-3 row">
                        <label htmlFor="bedType" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Available Beds</label>
                        <div class="col-md-8 col-12 mb-3 mb-md-1">
                            <select class="w-100 h-100 form-select" id="bedType" aria-label="Default select example" onChange={(e)=> setBedType(e.target.value) }>
                                <option value="ss">Select Bed</option>
                                {hospital && hospital.generalBeds > 0 ? <option value="generalBeds">General Beds: {hospital.generalBeds}</option> : ""}
                                {hospital && hospital.icuBeds > 0 ? <option value="icuBeds">ICU Beds: {hospital.icuBeds}</option> : ""}
                                {hospital && hospital.ventilatorBeds > 0 ? <option value="ventilatorBeds">Ventilator Beds: {hospital.ventilatorBeds}</option> : ""}
                                {hospital && hospital.oxygenBeds > 0 ? <option value="oxygenBeds">Oxygen Beds: {hospital.oxygenBeds}</option> : ""}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                            <div className="col-lg-2 col-md-3 col-5">
                                <button type="submit" className="btn btn-raised btn-outline-success fw-bold">Submit</button>
                            </div>
                            <div className="col-lg-2 col-md-3 col-5">
                                <button type="reset" className="btn btn-raised btn-outline-danger fw-bold">Reset</button>
                            </div>
                    </div>
                </form>
            
        </div>   
    )
}
export default RegisterPatientFromUser;