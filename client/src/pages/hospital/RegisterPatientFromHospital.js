import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HospitalCities from './Json/HospitalCities.json';
import HospitalStates from './Json/HospitalStates.json';
import { registerPatientFromHospital, addSlotFromHospital } from '../../functions/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import PatientForm from '../../components/reusables/PatientForm';

const RegisterPatientFromHospital = () =>{

    const { user, hospital } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();
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
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [medicationStatus, setMedicationStatus] = useState("");
    const [medicationList, setMedicationList] = useState("");
    const [medicationAllergies, setMedicationAllergies] = useState("");
    const [operationsList, setOperationsList] = useState("");
    const [status, setStatus] = useState("Admitted");
    const [bedType, setBedType] = useState("");
    let [healthIssuesChecked, setHealthIssuesChecked] = useState([]);
    let [covidSymptomsChecked, setCovidSymptomsChecked] = useState([]);
    const [generalBeds, setGeneralBeds] = useState(hospital && hospital.generalBeds);
    const [ventilatorBeds, setVentilatorBeds] = useState(hospital && hospital.ventilatorBeds);
    const [icuBeds, setIcuBeds] = useState(hospital && hospital.icuBeds);
    const [oxygenBeds, setOxygenBeds] = useState(hospital && hospital.oxygenBeds);

    let citiesOptions = null;

    HospitalCities.map((item)=>{
        if(item.state===state)
        citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const onChange = (e, id, value) => {
        switch(id){
            case 'patientBirthDate': setDob(value); break;
            case 'gender': setGender(value); break;
            case 'contactNumber': setContact(value); break;
            case 'email': setEmail(value); break;
            case 'streetAddress': setAddress(value); break;
            case 'state': setState(value); break;
            case 'city': setCity(value); break;
            case 'pinCode': setPinCode(value); break;
            case 'maritalStatus': setMaritalStatus(value); break;
            case 'relationship': setRelationship(value); break;
            case 'eContactNumber': setEContact(value); break;
            case 'weight': setWeight(value); break;
            case 'height': setHeight(value); break;
            case 'medication': setMedicationStatus(value); break;
            case 'medicationTextArea': setMedicationList(value); break;
            case 'allergies': setMedicationAllergies(value); break;
            case 'operationsTextArea': setOperationsList(value); break;
            case 'bedType': setBedType(value); break;
            case 'healthIssues': {
                if(!e.target.checked){
                    healthIssuesChecked = healthIssuesChecked.filter((item)=> item!== value);
                }
                else{
                    healthIssuesChecked.push(value);
                }
                setHealthIssuesChecked(healthIssuesChecked);
            }; break;

            case 'covidSymptoms': {
                if(!e.target.checked){
                    covidSymptomsChecked = covidSymptomsChecked.filter((item)=> item!== value);
                }
                else{
                    covidSymptomsChecked.push(value);
                }
                console.log(covidSymptomsChecked);
                setCovidSymptomsChecked(covidSymptomsChecked);
            }; break;
        }
    }

    let data = { firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, maritalStatus, eFirstName, eLastName, relationship, eContact, weight, height, medicationStatus, medicationList, medicationAllergies, operationsList, healthIssuesChecked, covidSymptomsChecked, bedType, generalBeds, icuBeds, ventilatorBeds, oxygenBeds};

     
    const resetData = () => {
        setFirstName(""); setLastName(""); setDob(""); setGender(""); setEmail(""); setContact("");
        setAddress(""); setState(""); setCity(""); setPinCode(""); setMaritalStatus("");
        setEFirstName(""); setELastName(""); setRelationship(""); setEContact("");
        setWeight(""); setHeight(""); setMedicationStatus(""); setMedicationList(""); 
        setMedicationAllergies(""); setOperationsList(""); setHealthIssuesChecked([]); setCovidSymptomsChecked([]);
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookedBy = user.email;
        const patientDetails = { bookedBy, firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, maritalStatus, eFirstName, eLastName, relationship, eContact, weight, height, medicationStatus, medicationList, medicationAllergies, operationsList, healthIssuesChecked, covidSymptomsChecked, bedType, status};
        
        let answer = window.confirm("Confirm Registration?");
        if(answer){
            registerPatientFromHospital(patientDetails, user.token)
            .then((res)=> {
                if(res.data!=="User Not Registered"){
                    if(res.data!=="Patient Already registered with these details"){
                        dispatch({
                            type:'LOGIN',
                            payload: res.data 
                        })

                        addSlotFromHospital(email, status, user.token)
                        .then((res)=>{

                        })
                        .catch((e)=> console.log(e))
                        toast.success("Patient Registered");
                        resetData();
                        history.push('Dashboard');
                    }
                    else{
                        toast.error(res.data);
                        history.push('ManagePatients');
                    }
                }
                else toast.error(res.data);
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
                

                <PatientForm data={data} onChange={(e, id, value) => onChange(e, id, value)}/>

                {console.log(bedType, gender)}
            
        </div>   
    )
}
export default RegisterPatientFromHospital;