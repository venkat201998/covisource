import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HospitalCities from './Json/HospitalCities.json';
import HospitalStates from './Json/HospitalStates.json';
import { registerPatient } from '../../functions/auth';

const RegisterPatientFromHospital = () =>{

    const { user } = useSelector((state) => ({ ...state }))
    
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName);
        const patientDetails = { firstName, lastName };

        registerPatient(patientDetails, user.email, user.token)
        .then((res)=> console.log(res))
        .catch((e)=> console.log(e));
    }


    return(
        <div className="container">
            {/* <h3>Create Patient</h3> */}
            <div className="col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
                <h3>Patient Registration Form</h3>
                <form onSubmit={handleSubmit}>
        {/* ---------Personal details----------- */}    
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="patientName" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Patient Name</label>
                        <div class="col-12 mb-3 mb-md-0 col-md-6 col-xl-4">
                            <input 
                                type="text" 
                                className="form-control w-100"  
                                name="firstName"
                                value={firstName}
                                placeholder="First Name"
                                onChange={(e)=> setFirstName(e.target.value)}
                            />
                        </div>
                        <div class="col-12 col-md-6 col-xl-4">
                            <input 
                                type="text" 
                                className="form-control w-100"  
                                name="lastName"
                                value={lastName}
                                placeholder="Last Name"
                                onChange={(e)=> setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="patientBirthDate" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Birth Date</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input 
                                type="date" 
                                className="form-control w-100"  
                                name="patientBirthDate"
                                placeholder="Date of Birth"
                                onChange={(e)=> setDob(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="gender" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Gender</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <select class="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setGender(e.target.value)}>
                                <option value="sg">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="NA">N/A</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="contactNumber" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Contact Number</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input 
                                type="tel" 
                                className="form-control w-100"  
                                name="contactNumber"
                                placeholder="Contact"
                                onChange={(e)=> setContact(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="email" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">E-mail</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input 
                                type="email" 
                                className="form-control w-100"  
                                name="email"
                                placeholder="example@example.com"
                                onChange={(e)=> setEmail(e.target.value)}

                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="streetAddress" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Address</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-8">
                            <input 
                                type="text" 
                                className="form-control w-100 mb-3 mb-xl-0"  
                                name="streetAddress"
                                placeholder="Street address"
                                onChange={(e)=> setAddress(e.target.value)}
                            />
                            <div className="row my-xl-3 my-2">
                                <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                                    <select class="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                        <option value="ss">Select State</option>
                                        { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                    </select>
                                </div>
                                <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                                    <select class="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                        <option value="sc">Select City</option>
                                            {citiesOptions}
                                    </select>
                                </div>
                            </div>
                            <input 
                                type="text"
                                inputMode="numeric"
                                className="form-control col-12 col-xl-8"  
                                value={pinCode}
                                pattern="[0-9]{5}" 
                                maxLength="5"
                                placeholder="pin code"
                                onChange={(e) => setPinCode(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group my-xl-5 my-3 row">
                        <label for="maritalStatus" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Marital Status</label>
                        <div class="col-12 col-xl-6">
                            <select class="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setMaritalStatus(e.target.value) }>
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
                    <div className="row border border-0 border-top border-3 pt-3 fs-4" style={{color: "gray", borderColor: "gray"}}>In Case Of Emergency</div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="emergencyCName" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Emergency Contact</label>
                        <div class="col-12 mb-3 mb-md-0 col-md-6 col-xl-4">
                            <input 
                                type="text" 
                                className="form-control w-100"  
                                name="EcfirstName"
                                placeholder="First Name"
                                onChange={(e)=> setEFirstName(e.target.value)}
                            />
                        </div>
                        <div class="col-12 col-md-6 col-xl-4">
                            <input 
                                type="text" 
                                className="form-control w-100"  
                                name="EclastName"
                                placeholder="Last Name"
                                onChange={(e)=> setELastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="relationship" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Relationship</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input 
                                type="text" 
                                className="form-control w-100"  
                                name="relationship"
                                onChange={(e)=> setRelationship(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="EContactNumber" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Contact Number</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input 
                                type="tel" 
                                className="form-control w-100"  
                                name="EContactNumber"
                                placeholder="Contact"
                                onChange={(e)=> setEContact(e.target.value)}
                            />
                        </div>
                    </div>
        {/* ---------Health & medical history----------- */}
                    <div className="row border border-0 border-top border-3 pt-3 fs-4" style={{color: "gray", borderColor: "gray"}}>Health and Medical History</div>
                    <div class="form-group my-xl-5 my-3 row">
                        <label for="weight" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Weight</label>
                        <div class="col-12 col-md-6 col-xl-3 mb-3 mb-xl-0">
                            <input 
                                type="text" 
                                className="form-control w-100"  
                                name="weight"
                                placeholder="kg"
                                onChange={(e)=> setWeight(e.target.value)}
                            />
                        </div>     
                        <label for="height" class="col-12 col-xl-2 col-form-label text-start text-xl-end fw-bold fs-6">Height</label>
                        <div class="col-12 col-md-6 col-xl-3">
                            <input 
                                type="text"
                                inputMode="numeric"
                                className="form-control w-100"  
                                pattern="[0-9]{3}" 
                                maxLength="3"
                                placeholder="cm"
                                onChange={(e)=> setHeight(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div class="form-group my-xl-5 my-3 row">
                        <label for="medication" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">
                            Are you currently taking any medication?
                        </label>
                        <div class="col-6 col-xl-3 mt-0 mt-xl-4">
                            <input type="radio" className="col-2" onChange={(e)=> setMedicationStatus(e.target.value)}/>
                            <label htmlFor="Yes" className="col-4">Yes</label>

                            <input type="radio" className="col-2" onChange={(e)=> setMedicationStatus(e.target.value)}/>
                            <label className="col-4">No</label>
                        </div>
                    </div> */}
                    <div class="form-group my-xl-5 my-3 row">     
                        <label for="medicationList" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">
                            If yes, please list it here...
                        </label>
                        <div class="col-12 col-xl-6">
                            <textarea 
                                className="form-control"  
                                onChange={(e)=> setMedicationStatus(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div class="form-group my-xl-5 my-3 row">
                        <label for="allergies" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">
                            Do you have any medication allergies
                        </label>
                        <div class="col-12 col-lg-8 col-xl-6 mt-0 mt-xl-3">
                            <input type="radio" className="col-1"/>
                            <label className="col-2">Yes</label>

                            <input type="radio" className="col-1"/>
                            <label className="col-2">No</label>

                            <input type="radio" className="col-1"/>
                            <label className="col-3">Not sure</label>
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">     
                        <label for="operations" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">
                            Please list any operations and dates of each
                        </label>
                        <div class="col-12 col-xl-6">
                            <textarea 
                                className="form-control"  
                            />
                        </div>
                    </div>
                    <div class="form-group my-xl-5 my-3 row">     
                        <label for="healthIssues" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">
                            Have you ever had <br/>
                            ( Please check all that apply...)
                        </label>
                        <div className="col-12 col-xl-8">
                            <div className="row my-2">
                                { healthList.map((item, i)=>{
                                    return(
                                        <div className="col-4 mb-2">
                                            <input className="col-2 m-auto" type="checkbox" key={item} value={item}/>
                                            <label className="col-10 m-auto text-start">{item}</label>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div> */}
        {/* ---------Covid Symptoms----------- */}
                    {/* <div className="row border border-0 border-top border-3 pt-3 fs-4" style={{color: "gray", borderColor: "gray"}}>Covid-19 Questionnaire</div>
                    <div class="form-group my-xl-5 my-3 row">     
                        <label for="covidSymptoms" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">
                            Please check the symptoms that apply...
                        </label>
                        <div className="col-12 col-xl-8">
                            <div className="row my-2">
                                { covidSymptomsList.map((item, i)=>{
                                    return(
                                        <div className="col-6 mb-2">
                                            <input className="col-2 m-auto" type="checkbox" key={item} value={item}/>
                                            <label className="col-10 m-auto text-start">{item}</label>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div> */}
                    <div className="form-group w-50 mx-auto my-md-5 my-3 d-flex flex-col px-lg-2">
                            <div className="col-lg-5">
                                <button type="submit" className="btn btn-raised btn-outline-info w-100 mx-auto">Submit</button>
                            </div>
                            <div className="col-lg-5 offset-1">
                                <button type="reset" className="btn btn-raised btn-outline-danger w-100 mx-auto">Reset</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>    
    )
}
export default RegisterPatientFromHospital;