import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HospitalCities from '../hospital/Json/HospitalCities.json';
import HospitalStates from '../hospital/Json/HospitalStates.json';
import { registerPatientFromUser, getHospitals, currentUser } from '../../functions/auth';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import PatientForm from '../../components/reusables/PatientForm';

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
    const [generalBeds, setGeneralBeds] = useState();
    const [ventilatorBeds, setVentilatorBeds] = useState();
    const [icuBeds, setIcuBeds] = useState();
    const [oxygenBeds, setOxygenBeds] = useState();
    const [loading, setLoading] = useState(true);
    const [buttons, setButtons] = useState([
        {name: "Submit", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"},
        {name: "Reset", type: "reset", className: "btn btn-outline-danger btn-raised fw-bold"}
    ]);

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
                setLoading(false);
            }
        })

        getHospitals()
        .then((res)=>{
            setHospital(res.data.find((r)=> r._id===slug));
            setGeneralBeds(hospital.generalBeds);
            setIcuBeds(hospital.icuBeds);
            setVentilatorBeds(hospital.ventilatorBeds);
            setOxygenBeds(hospital.oxygenBeds);

        })
        

    },[user]) 

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
            registerPatientFromUser(patientDetails, slug, user.token)
            .then((res)=> {
                if(res.data==="Patient Already registered with these details" || res.data==="Hospital Not Registered" || res.data==="Patient either admitted or onhold by another user"
                || res.data==="Failed To Update Hospital" || res.data==="User Not Registered" || res.data==="Failed To Update User"){
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
                { loading ? <h3>Loading...</h3> : 
                <PatientForm data={data} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit} handleReset={handleReset}/> }
                    
        </div>   
    )
}
export default RegisterPatientFromUser;