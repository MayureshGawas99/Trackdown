import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function RegisterPage() {
  const host = process.env.REACT_APP_API;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [mac, setMac] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      const response = await fetch(`${host}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          mac: mac,
          phone: phone,
          address: address,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/");
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
              alt="Login"
            />
          </MDBCol>
          <MDBCol col="4" md="4" className="">
            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-3"
                id="name"
                type="text"
                size="md"
                value={name}
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                placeholder="MAC Address"
                id="mac"
                type="text"
                size="md"
                value={mac}
                required
                onChange={(e) => setMac(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                placeholder="Email address"
                id="email"
                type="email"
                size="md"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                placeholder="Password"
                id="password"
                type="password"
                size="md"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                placeholder="Confirm Password"
                id="cpassword"
                type="password"
                size="md"
                value={cpassword}
                required
                onChange={(e) => setCpassword(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                placeholder="Phone No."
                id="phone"
                type="text"
                size="md"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                placeholder="Confirm Password"
                id="address"
                type="text"
                size="md"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              {/* <div className="d-flex justify-content-center"> */}
              <MDBBtn className="my-2 w-100" size="md" type="submit">
                <b>REGISTER</b>
              </MDBBtn>
              {/* </div> */}
              <div className="divider d-flex justify-content-center align-items-center ">
                <p className="text-center fw-bold mx-3 mb-0">OR</p>
              </div>
              <MDBBtn
                className="my-2 w-100"
                size="md"
                style={{ backgroundColor: "#3b5998" }}
                onClick={() => navigate("/login")}
              >
                <b>LOGIN</b>
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
