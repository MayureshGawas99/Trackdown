import React, { useContext, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { MapContext } from "../App";

export default function RegisterPage() {
  const host = process.env.REACT_APP_API;
  const [name, setName] = useState("");
  const { email, setEmail } = useContext(MapContext);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/login");
        setTimeout(() => {
          enqueueSnackbar("Succesfully Registered", { variant: "success" });
        }, 500);
      } else {
        enqueueSnackbar("Invalid Details", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Password does not Match", { variant: "warning" });
    }
  };
  return (
    <div className="container">
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol col="10" md="7">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </MDBCol>
          <MDBCol col="4" md="4">
            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-2"
                label="Name"
                id="name"
                type="text"
                size="lg"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-2"
                label="Email address"
                id="email"
                type="email"
                size="lg"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-2"
                label="Password"
                id="password"
                type="password"
                size="lg"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-2"
                label="Confirm Password"
                id="cpassword"
                type="password"
                size="lg"
                value={cpassword}
                required
                onChange={(e) => setCpassword(e.target.value)}
              />

              <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                Register
              </MDBBtn>
            </form>
            <div className="divider d-flex justify-content-center align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>
            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#3b5998" }}
              onClick={() => navigate("/login")}
            >
              Login
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
