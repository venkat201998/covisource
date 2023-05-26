import { React, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { checkUser, currentUser } from '../../functions/auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => ({...state}));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const rolebasedredirect = (type) => {
    if(type==="Admin"){
      history.push("/");
    }
    else if(type==="Hospital"){
      history.push("/Hospital/Dashboard");
    }
    else if(type==="User"){
      history.push("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {user} = result;
      if(user){
        toast.success("Login Success");
        setLoading(false);
      }else{
        toast.error("Something went wrong");
        setLoading(false);
        history.push("/login");
      }

      const idTokenResult = await user.getIdTokenResult();
      let options=[];
      let uaoptions=[];

      currentUser(idTokenResult.token)
        .then((res)=>{
            switch(res.data.type){
                case 'Admin': options = ['Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword'];
                break;
                case 'Hospital': options=['Dashboard', 'ManageHospital', 'RegisterPatient', 'ManagePatients', 'PatientsHistory', 'UpdatePassword'];
                break;
                case 'User': options=['Dashboard', 'SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'];
                break;
            }
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
                options: options,
                uaoptions: uaoptions,
                slots: res.data.slots,
                token: res.config.headers.idToken
              },
            });
          rolebasedredirect(res.data.type);
        })
    } catch (error) {
        checkUser(email)
        .then((res) => {
          if(res.data == "User not found"){
            toast.error('Please Complete Registration To Login');
            history.push('/register');
          }else{
            toast.error("Invalid Credentials");
          }
        })
        .catch((err) => toast.error(err));
        setLoading(false);
    }
    
  };

  return (
    <div className="container mt-5">
        <div className="row mt-5 pt-5">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
          <form onSubmit={handleSubmit} className="container-fluid">
            <div className="form-group mb-4 text-center">
              {loading ? <h3>Login</h3> :  <h3>Loading...</h3>}
            </div>
            <div class="form-group my-3 row p-0">
              <label htmlFor="email" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
              <div class="col-md-8 col-12 mb-3 mb-md-1 p-0">
                <input
                  id="email"
                  type="email"
                  className="form-control w-100"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@example.com"	
                />
              </div>
            </div>
            <div class="form-group my-3 row p-0">
              <label htmlFor="password" class="col-md-3 d-none d-md-block col-form-label text-xl-end fw-bold fs-6">Password</label>
              <div class="col-md-8 col-12 mb-3 mb-md-1 p-0">
                <input
                  id="password"
                  type="password"
                  className="form-control w-100"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"	
                />
              </div>
            </div>
          

            <div className="form-group row p-0">
              <div className="col-md-4 col-6 offset-md-3 text-start p-0">
                <button className="btn btn-raised btn-outline-success fw-bold" type="submit" disabled={!email || password.length < 6}>
                  Login
                </button>
              </div>
            </div>
            <div className="form-group row p-0 justify-content-end">
                <div className="col-md-4 col-10 text-md-start text-end">
                    <Link to="/forgot/password" className="text-danger">
                      Forgot Password
                    </Link>
                </div>
            </div>            
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
