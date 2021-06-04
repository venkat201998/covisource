import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { createOrUpdateUser, currentUser } from '../../../functions/auth';
import { useDispatch } from 'react-redux';

const UserRegisterComplete = () => {
    const [loading, setLoading] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        setEmail(window.localStorage.getItem('email'));
    },[])

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const result = await auth.signInWithEmailLink(email, window.location.href);
        const user = auth.currentUser;
        const idTokenResult = await user.getIdTokenResult();

        if (!email || !password) {
            toast.error("Email and password is required");
            setLoading(false);
            return;
        }
      
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        if(result.user.emailVerified){
            user.updatePassword(password);

            createOrUpdateUser(idTokenResult.token, "User")
            .then((res) => {
                toast.success("Registration Success");
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Registration Failure");
                setLoading(false);
            });

        }
        window.localStorage.removeItem("email");

        let options=[];
        let uaoptions=[];

        currentUser(idTokenResult.token)
        .then((res)=>{
            switch(res.data.type){
                case 'Admin': options.push('Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword');
                            //   uaoptions.push('Dashboard', 'Slot', 'SlotsHistory', 'UpdatePassword');
                break;
                case 'Hospital': options=['Dashboard', 'ManageHospital', 'RegisterPatient', 'ManagePatients', 'PatientsHistory', 'UpdatePassword'];
                break;
                case 'User': options=['Dashboard', 'Slot', 'SlotsHistory', 'UpdatePassword'];
                break;
                
            }
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: res.data.email,
              firstName: res.data.firstName,
              type: res.data.type,
              _id: res.data._id,
              options: options,
              uaoptions: uaoptions,
              token: res.config.headers.idToken
            },
          });
        })

        history.push('/');

    }

    return(
        <div className="container mt-5">
            <div className="row mt-5 pt-5">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 text-center">
                            {loading ? <h4>Loading..</h4> :  <h4>User Registration Complete</h4>}
                        </div>
                        <input
                        type="email"
                        className="form-control my-3"
                        value={email}
                        placeholder="Your email"
                        disabled
                        />

                        <input
                        type="password"
                        className="form-control my-3"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        />

                        <br />
                        <button type="submit" className="btn btn-raised btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserRegisterComplete;