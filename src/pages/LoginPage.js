import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { enqueueSnackbar } from "notistack";
import { MapContext } from "../App";

export default function LoginPage() {
  const host = process.env.REACT_APP_API;
  const [password, setPassword] = useState("");
  const { email, setEmail } = useContext(MapContext);

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("email", email);
      navigate("/");
      setTimeout(() => {
        enqueueSnackbar("Logged in Succesfully", { variant: "success" });
      }, 500);
    } else {
      enqueueSnackbar("Invalid Credentials", { variant: "error" });
    }
  };

  return (
    <div className="container">
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol col="10" md="7">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </MDBCol>
          <MDBCol col="4" md="4">
            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperclassName="mb-5"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperclassName="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                Login
              </MDBBtn>
            </form>

            <div className="divider d-flex justify-content-center align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#3b5998" }}
              onClick={() => navigate("/register")}
            >
              Register
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
