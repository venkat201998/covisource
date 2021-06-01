import axios from 'axios';

export const createOrUpdateUser = async (idToken, type) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {
            type
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const checkUser = async (email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/check-user`,
        {
            email
        }
    )
}

export const currentUser = async (idToken) =>{
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers:{
                idToken
            }
        }
    )
}

export const createHospital = async (hospitalDetails, email, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/create-hospital-details`,
        {
            hospitalDetails,
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
} 

export const checkHospital = async (email) => {
    return axios.post(
        `${process.env.REACT_APP_API}/check-hospital`,
        {
            email
        }
    )
}

export const updateHospital = async (hospitalDetails, email, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/update-hospital`,
        {
            hospitalDetails,
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const registerPatient = async (patientDetails, email, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/register-patient`,
        {
            patientDetails,
            email
        },
        {
            headers:{
                idToken
            }
        } 
    )
}