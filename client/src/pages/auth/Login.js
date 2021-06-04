import { React, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { currentUser } from '../../functions/auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const { user } = useSelector((state) => ({...state}));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);


  const rolebasedredirect = (type) => {
    if(type==="Admin"){
      history.push("/");
    }
    else if(type==="Hospital"){
      history.push("/");
    }
    else if(type==="User"){
      history.push("/");
    }
  };

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
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
                case 'Admin': options.push('Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword');
                             // uaoptions.push('Dashboard', 'Slot', 'SlotsHistory', 'UpdatePassword');
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
          rolebasedredirect(res.data.type);
        })
    } catch (error) {
      toast.error("Invalid Credentials");
      setLoading(false);
    }
    
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5 pt-5">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-center">
                {loading ? <h4>Loading..</h4> :  <h4>Login</h4>}
            </div>
            <div className="form-group my-2">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus
              />
            </div>

            <div className="form-group my-2">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </div>

            <br />
            <button
              className="btn btn-raised btn-primary"
              type="submit"
              disabled={!email || password.length < 6}
            >
              Login
            </button>
          </form>
          <Link to="/forgot/password" className="float-end text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
