import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function Modal() {
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    mac,
    setMac,
    address,
    setAddress,
  } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  let navigate = useNavigate();
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = {
      name,
      email,
      password,
      phone,
      mac,
      address,
    };
    if (selectedFile) {
      // const cloudData = new FormData();
      // cloudData.append("file", selectedFile);
      // cloudData.append("upload_preset", "chat-app");
      // const response = await axios.post(
      //   `https://api.cloudinary.com/v1_1/djuseai07/image/upload`,
      //   cloudData
      // );
      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/djuseai07/image/upload";
      const cloudData = new FormData();
      cloudData.append("file", selectedFile);
      cloudData.append("upload_preset", "chat-app");

      try {
        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: cloudData,
        });

        if (response.ok) {
          // Request was successful
          const responseData = await response.json();
          formData.pic = responseData.url;

          console.log(responseData);
        } else {
          // Handle the error or non-successful response here
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    console.log(formData);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/auth/updateuser`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      }
    );

    const json = await response.json();
    if (json.success) {
      console.log(json);
      localStorage.setItem("info", JSON.stringify(json.user));
      if (selectedFile) {
        window.location.reload();
      }
      setTimeout(() => {
        enqueueSnackbar("Profile Updated Succesfully", { variant: "success" });
      }, 500);
    } else {
      enqueueSnackbar("Update Unsuccessfull", { variant: "error" });
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Info
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <p className="d-flex">Name</p>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <p className="d-flex">Password</p>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <p className="d-flex">MAC Address</p>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={mac}
                  required
                  onChange={(e) => setMac(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <p className="d-flex">Phone</p>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <p className="d-flex">Address</p>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <p className="d-flex">Profile Pic</p>
                <input
                  type="file"
                  name="pic"
                  className="form-control-file w-100"
                  onChange={handleImageChange}
                  accept="image/*"
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
