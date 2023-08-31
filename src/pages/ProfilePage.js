import React, { useContext, useEffect } from "react";
import Modal from "../components/Modal";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
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
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/getuser`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          const { name, email, phone, mac, address } = response.data;
          setName(name);
          setEmail(email);
          setPhone(phone);
          setMac(mac);
          setAddress(address);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    UserData();
  }, []);
  return (
    <div style={{ backgroundColor: "#eee", height: "100%" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={`./images/${
                    localStorage.getItem("image")
                      ? localStorage.getItem("image")
                      : 5
                  }.jpg`}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">{name}</h5>
                <p className="text-muted mb-1">Raspberry Pi MAC Address</p>
                <p className="text-muted mb-4">{mac}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Modal />
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                    onClick={() => navigate("/avatar")}
                  >
                    Avatar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Password</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">********</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">MAC Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{mac}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
