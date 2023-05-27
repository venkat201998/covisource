import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerPatientFromHospital, addSlotFromHospital } from '../../functions/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import PatientForm from '../../components/reusables/PatientForm';

const RegisterPatientFromHospital = () =>{

    const { user, hospital } = useSelector((state) => ({ ...state }));
    const token = user && user.token;
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
    const [generalBeds, setGeneralBeds] = useState("");
    const [ventilatorBeds, setVentilatorBeds] = useState("");
    const [icuBeds, setIcuBeds] = useState("");
    const [oxygenBeds, setOxygenBeds] = useState("");
    const [loading, setLoading] = useState(true);
    const [buttons, setButtons] = useState([
        {name: "Submit", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"},
        {name: "Reset", type: "reset", className: "btn btn-outline-danger btn-raised fw-bold"}
    ]);

    useEffect(()=> {
        if(hospital){
            setGeneralBeds(hospital && hospital.generalBeds);
            setIcuBeds(hospital && hospital.icuBeds);
            setVentilatorBeds(hospital && hospital.ventilatorBeds);
            setOxygenBeds(hospital && hospital.oxygenBeds);
            setLoading(false);
        }
    }, [hospital])

    const onChange = (e, id, value) => {
        switch(id){
            case 'firstName': setFirstName(value); break;
            case 'lastName': setLastName(value); break;
            case 'eFirstName': setEFirstName(value); break;
            case 'eLastName': setELastName(value); break;
            case 'dob': setDob(value); break;
            case 'gender': setGender(value); break;
            case 'contact': setContact(value); break;
            case 'email': setEmail(value); break;
            case 'address': setAddress(value); break;
            case 'state': setState(value); break;
            case 'city': setCity(value); break;
            case 'pinCode': setPinCode(value); break;
            case 'maritalStatus': setMaritalStatus(value); break;
            case 'relationship': setRelationship(value); break;
            case 'eContact': setEContact(value); break;
            case 'weight': setWeight(value); break;
            case 'height': setHeight(value); break;
            case 'medicationStatus': setMedicationStatus(value); break;
            case 'medicationList': setMedicationList(value); break;
            case 'medicationAllergies': setMedicationAllergies(value); break;
            case 'operationsList': setOperationsList(value); break;
            case 'bedType': setBedType(value); break;
            case 'healthIssuesChecked': {
                if(!e.target.checked){
                    healthIssuesChecked = healthIssuesChecked.filter((item)=> item!== value);
                }
                else{
                    healthIssuesChecked.push(value);
                }
                setHealthIssuesChecked(healthIssuesChecked);
            }; break;

            case 'covidSymptomsChecked': {
                if(!e.target.checked){
                    covidSymptomsChecked = covidSymptomsChecked.filter((item)=> item!== value);
                }
                else{
                    covidSymptomsChecked.push(value);
                }
                setCovidSymptomsChecked(covidSymptomsChecked);
            }; break;
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
        e.preventDefault();

        const bookedBy = user.email;
        const patientDetails = { bookedBy, firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, maritalStatus, eFirstName, eLastName, relationship, eContact, weight, height, medicationStatus, medicationList, medicationAllergies, operationsList, healthIssuesChecked, covidSymptomsChecked, bedType, status};
        
        let answer = window.confirm("Confirm Registration?");
        if(answer){
            registerPatientFromHospital(patientDetails, token)
            .then((res)=> {
                if(res.data!=="User Not Registered"){
                    if(res.data!=="Patient Already registered with these details"){
                        dispatch({
                            type:'HOSPITAL',
                            payload: res.data 
                        })

                        addSlotFromHospital(email, status, token)
                        .then((res)=>{

                        })
                        .catch((e)=> toast.error(e))
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
            { loading ? <h3>Loading...</h3> : 
                <div>
                    <h3>Patient Registration Form</h3>
                    <PatientForm data={{firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, maritalStatus, eFirstName, eLastName, relationship, eContact, weight, height, medicationStatus, medicationList, medicationAllergies, operationsList, healthIssuesChecked, covidSymptomsChecked, bedType, generalBeds, icuBeds, ventilatorBeds, oxygenBeds}} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit} handleReset={handleReset}/>    
                </div>

            }
        </div>   
    )
}
export default RegisterPatientFromHospital;