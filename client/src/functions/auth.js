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

export const createHospitalDetails = async (hospitalDetails, email) => {
    return axios.post(
        `${process.env.REACT_APP_API}/create-hospital-details`,
        {
            hospitalDetails,
            email
        }
    )
} 

export const checkIfUserRegisteredHospital = async (email) => {
    return axios.post(
        `${process.env.REACT_APP_API}/check-if-user-registered-hospital`,
        {
            email
        }
    )
}