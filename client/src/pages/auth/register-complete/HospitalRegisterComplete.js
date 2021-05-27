import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../../../firebase";
import { createOrUpdateUser,currentUser } from '../../../functions/auth';

const HospitalRegisterComplete = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("email"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithEmailLink(email, window.location.href);

    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (result.user.emailVerified) {
      const user = auth.currentUser;
      user.updatePassword(password);

      const authToken = await user.getIdTokenResult();

      createOrUpdateUser(authToken.token, "Hospital")
      .then((res) => toast.success("Registration Success"))
      .catch((err) => toast.error("Registration Failure"));

    }
    window.localStorage.removeItem("email");

    currentUser(idTokenResult.token)
        .then((res)=>{
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: res.data.email,
              firstName: res.data.firstName,
              type: res.data.type,
              _id: res.data._id,
              token: res.config.headers.idToken
            },
          });
        })

    history.push("/");
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5 pt-5">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
          <form onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br />
            <button type="submit" className="btn btn-raised btn-primary">
              Register{" "}
            </button>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default HospitalRegisterComplete;
