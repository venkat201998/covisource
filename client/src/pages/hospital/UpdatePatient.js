import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HospitalCities from './Json/HospitalCities.json';
import HospitalStates from './Json/HospitalStates.json';
import { registerPatient } from '../../functions/auth';
import { toast } from 'react-toastify';
import SideNav from '../../components/sideNav/SideNav';

const UpdatePatient = () =>{

    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();

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

    // const [healthIssuesC, setHealthIssuesC] = useState([]);
    // const [covidSymptomsC, setCovidSymptomsC] = useState([]);

    const inputChecked= false;
    let healthIssues=[];
    let healthIssuesChecked=[];
    let covidSymptoms=[];
    let covidSymptomsChecked=[];
    
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
            }
            else if (healthIssues[e.target.value]===false){
                healthIssues[e.target.value]=true;
                healthIssuesChecked.push(e.target.value);
            }
            else{
                healthIssues[e.target.value] = !inputChecked;
                healthIssuesChecked.push(e.target.value);
            }
            
            console.log(healthIssues);
            console.log(healthIssuesChecked);
            // setHealthIssuesC(healthIssuesChecked);
        }
        else{
            if(covidSymptoms[e.target.value]===true){
                covidSymptoms[e.target.value]=false;
                covidSymptomsChecked = covidSymptomsChecked.filter((item)=> item!== e.target.value);
            }
            else if (covidSymptoms[e.target.value]===false){
                covidSymptoms[e.target.value]=true;
                covidSymptomsChecked.push(e.target.value);
            }
            else{
                covidSymptoms[e.target.value] = !inputChecked;
                covidSymptomsChecked.push(e.target.value);
            }
            
            console.log(covidSymptoms);
            console.log(covidSymptomsChecked);
            // setCovidSymptomsC(covidSymptomsChecked);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const patientDetails = { firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, maritalStatus, 
                                eFirstName, eLastName, relationship, eContact, weight, height, medicationStatus, medicationList, 
                                medicationAllergies, operationsList, healthIssuesChecked, covidSymptomsChecked};
        registerPatient(patientDetails, user.email, user.token)
        .then((res)=> {
            dispatch({
                type:'LOGIN',
                payload: {
                    data: res.data
                } 
            })
            toast.success("Patient Registered")
        })
        .catch((e)=> toast.error(e));
    }


    return(
        <div className="container-fluid mt-5 px-5">
                <div className="row mt-5 pt-5">
                    <SideNav/>
                    
                    <div className="col-lg-8 col-md-8 col-sm-8 p-md-4 p-3 text-center">
                        <div className="row justify-content-center  border shadow">
                            <div className="col-lg-8">
                        <h3>Hospital Info</h3>
                        <form>
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
                                        value={dob}
                                        placeholder="Date of Birth"
                                        onChange={(e)=> setDob(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="form-group my-xl-5 my-3 row">
                                <label for="gender" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Gender</label>
                                <div class="col-12 mb-3 mb-md-0 col-xl-6">
                                    <select class="w-100 h-100 form-select" value={gender} aria-label="Default select example" onChange={(e)=> setGender(e.target.value)}>
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
                                        value={contact}
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
                                        value={email}
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
                                        value={address}
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
                                        pattern="[0-9]{6}" 
                                        maxLength="6"
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
                                        value={eFirstName}
                                        placeholder="First Name"
                                        onChange={(e)=> setEFirstName(e.target.value)}
                                    />
                                </div>
                                <div class="col-12 col-md-6 col-xl-4">
                                    <input 
                                        type="text" 
                                        className="form-control w-100"  
                                        name="EclastName"
                                        value={eLastName}
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
                                        value={relationship}
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
                                        value={eContact}
                                        placeholder="Contact"
                                        onChange={(e)=> setEContact(e.target.value)}
                                    />
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