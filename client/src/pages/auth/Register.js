import { React, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { checkUser } from '../../functions/auth';

const Register = ({history}) => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
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
            url: "http://localhost:3000/RegisterComplete",
            handleCodeInApp: true,
          };
          
          auth.sendSignInLinkToEmail(email, config);
          setLoading(false);
          toast.success(
            `Email is sent to ${email}. Click the link to complete your registration.`
          );
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
                {loading ? <h3>Loading..</h3> :  <h3>Registration</h3>}
            </div>
            <div class="form-group my-3 row p-0">
						<label htmlFor="email" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
						<div class="col-md-9 col-12 p-0 mb-3 mb-md-1">
							<input
								id="email"
								type="email"
								className="form-control w-100 w-md-50"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="abc@example.com"
								autoFocus	
							/>
						</div>
					</div>
          <div class="form-group my-3 row p-0">
						<label htmlFor="userType" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Type</label>
						<div class="col-md-9 col-12 p-0 mb-3 mb-md-1">
							<select className="form-select w-50" id="userType" onChange={(e)=> setType(e.target.value)}>
                <option value="select">Select Type</option>
                <option value="User">User</option>
                <option value="Hospital">Hospital</option>
                
              </select> 
						</div>
					</div>
          <div className="form-group row">
						<div className="col-md-4 col-6 offset-md-3 text-start p-0">
							<button className="btn btn-raised btn-outline-primary" type="submit" disabled={!email || !type}>
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
