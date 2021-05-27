import { React, useState } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { checkUser } from '../../../functions/auth';

const HospitalRegister = ({history}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkUser(email)
    .then((res)=> {
      userRedirect(res.data);

    })
    .catch((e)=> console.log(e));

    const userRedirect=(data)=>{
      if(data==="Subscriber" || data==="Hospital"){
        toast.error(`You're already registered as ${data}`);
        history.push("/login");
      }
      else if(data==="User not found"){
        const config = {
          url: "http://localhost:3000/hospitalRegisterComplete",
          handleCodeInApp: true,
        };
    
        auth.sendSignInLinkToEmail(email, config);
    
        toast.success(
          `Email is sent to ${email}. Click the link to complete your registration.`
        );
      }
    } 

    window.localStorage.setItem("email", email);
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5 pt-5">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
          <h4>Hospital Registration</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              autoFocus
            />

            <br />
            <button type="submit" className="btn btn-raised btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegister;
