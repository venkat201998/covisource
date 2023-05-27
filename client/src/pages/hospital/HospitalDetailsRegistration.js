import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createHospital } from '../../functions/auth';
import { useHistory } from 'react-router-dom';
import HospitalForm from '../../components/reusables/HospitalForm';

const HospitalDetailsRegistration = () =>{
    const { user } = useSelector((state) => ({ ...state }));
    const token = user && user.token;
    const history = useHistory();
    const dispatch = useDispatch();

    const [hospitalName, setHospitalName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [generalBeds, setGeneralBeds] = useState("");
    const [icuBeds, setIcuBeds] = useState("");
    const [ventilatorBeds, setVentilatorBeds] = useState("");
    const [oxygenBeds, setOxygenBeds] = useState("");
    const [status, setStatus] = useState("Inactive");
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState("");
    const [buttons, setButtons] = useState([
        {name: "Submit", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"},
        {name: "Reset", type: "reset", className: "btn btn-outline-danger btn-raised fw-bold"}
    ]);

    useEffect(() => {
        if(user && user.type === "Hospital"){
            setEmail(user.email);
            setStatus("Inactive");
            setDisabled(true);
            setLoading(false);
        }else if(user && user.type === "Admin"){
            setEmail("");
            setStatus("Active");
            setDisabled(false);
            setLoading(false);
        }
    }, [user])

    const onChange = (e, id, value) => {
        e.preventDefault();
        switch(id){
            case "hospitalName": setHospitalName(value); break;
            case "address": setAddress(value); break;
            case "pinCode": setPinCode(value); break;
            case "state": setState(value); break;
            case "city":  setCity(value); break;
            case "hospitalContact": setContact(value); break;
            case "hospitalEmail": setEmail(value); break;
            case "generalBeds": setGeneralBeds(value); break;
            case "icuBeds": setIcuBeds(value); break;
            case "ventilatorBeds": setVentilatorBeds(value); break;
            case "oxygenBeds": setOxygenBeds(value); break;
        }
        
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const hospitalDetails = {hospitalName, address, state, city, pinCode, contact, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, status};

        let answer = window.confirm("Confirm Registration?");
        if(answer){
            createHospital(hospitalDetails, email, token)
            .then((res) =>{
                if(res.data !== "No User Exists With The Email Provided"){
                    if(res.data !== "Hospital already exists"){
                        user && user.type === "Hospital" 
                        ? toast.success("Added Details and waiting to be validated by admin")
                        : toast.success("Hospital Registered Succesfully");
                        dispatch({
                            type:'HOSPITAL',
                            payload: res.data 
                        })
                    }
                    else{
                        toast.error("Already Hospital registered");
                    }
                }else{
                    toast.error(res.data);
                }
                
            })
            .catch((err) => toast.error("Failed Registration"));
        }else{
            toast.error("Failed To Register");
        }
        if(user && user.type === "Hospital"){
            history.push("/Hospital/ManageHospital");
        }
    }

    const handleReset = async(e) =>{
        e.preventDefault();
        let answer = window.confirm("Reset Form?");
            if(answer){
                setHospitalName("");
                setAddress("");
                setState("");
                setCity("");
                setPinCode("");
                setContact("");
                setEmail("");
                setGeneralBeds("");
                setIcuBeds("");
                setVentilatorBeds("");
                setOxygenBeds("");
            }else{
                toast.error("Failed To Reset Form");
            }
        
    }


        return(
                <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
                    {loading ? <h3>Loading...</h3> :
                    <div>
                        <h3>Registration Form</h3>
                        <HospitalForm data={{hospitalName, address, state, city, pinCode, contact, email, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, disabled}} buttons={buttons} disabled={disabled} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit} handleReset={handleReset}/>
                    </div>}
                </div>
        )
}
export default HospitalDetailsRegistration;