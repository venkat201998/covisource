import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createHospital } from '../../functions/auth';
import { useHistory } from 'react-router-dom';
import Form from '../../components/reusables/Form';

const HospitalDetailsRegistration = () =>{
    const { user } = useSelector((state) => ({ ...state }));
    const history = useHistory();

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
    const dispatch = useDispatch();

    useEffect(() => {
        if(user && user.type === "Hospital"){
            setEmail(user.email);
            setStatus("Inactive");
        }else if(user && user.type === "Admin"){
            setEmail("");
            setStatus("Active");
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
            createHospital(hospitalDetails, email, user.token)
            .then((res) =>{
                if(res.data !== "No User Exists With The Email Provided"){
                    if(res.data !== "Hospital already exists"){
                        user && user.type === "Hospital" 
                        ? toast.success("Added Details and waiting to be validated by admin")
                        : toast.success("Hospital Registered Succesfully");
                        dispatch({
                            type:'LOGIN',
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
    }


        return(
                <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
                    <h3>Registration Form</h3>
                    <Form data={hospitalName, address, state, city, pinCode, contact, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, email} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit} handleReset={handleReset} />
                </div>
        )
}
export default HospitalDetailsRegistration;