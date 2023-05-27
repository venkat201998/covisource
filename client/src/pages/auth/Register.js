import { React, useState } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { checkUser } from '../../functions/auth';

const Register = ({history}) => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkUser(email)
    .then((res)=> {
      userRedirect(res.data);
    })
    .catch((err)=> {
      toast.error(err);
      setLoading(false);
    });

    const userRedirect=(data)=>{
      if(data==="User" || data==="Hospital" || data==="Admin"){
          toast.error(`You're already registered as ${data}`);
          setLoading(false);
          history.push("/login");
      }
      else if(data==="User not found"){
          const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
          };
          
          sendSignInLinkToEmail(auth, email, config)
          .then(() => {
            setLoading(false);
            toast.success(
              `Email is sent to ${email}. Click the link to complete your registration.`
            );
            history.push("/");
          })
          .catch(err => {
            window.alert(err);
            history.push("/");
          });
      }
    }    

    window.localStorage.setItem("email", email);
    window.localStorage.setItem("type", type);
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5 pt-5">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
          <form onSubmit={handleSubmit} className="container-fluid">
            <div className="form-group mb-4 text-center">
                {loading ? <h3>Registration</h3> :  <h3>Loading...</h3>}
            </div>
            <div class="form-group my-3 row">
						<label htmlFor="email" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
						<div class="col-md-8 col-12 mb-3 mb-md-1 p-0">
							<input
								id="email"
								type="email"
								className="form-control w-100"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="abc@example.com"	
							/>
						</div>
					</div>
          <div class="form-group my-3 row">
						<label htmlFor="userType" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Type</label>
						<div class="col-md-8 col-12 mb-3 mb-md-1 p-0">
							<select className="form-select w-50" id="userType" onChange={(e)=> setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="User">User</option>
                <option value="Hospital">Hospital</option>
                
              </select> 
						</div>
					</div>
          <div className="form-group row">
						<div className="col-md-4 col-6 offset-md-3 text-start p-0">
							<button className="btn btn-raised btn-outline-success fw-bold" type="submit" disabled={!email || !type}>
								Register
							</button>
						</div>
					</div> 
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
