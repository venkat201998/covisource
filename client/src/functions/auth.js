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
