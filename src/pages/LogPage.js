import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapContext } from "../App";
import moment from "moment/moment";

export default function LogPage() {
  const [logs, setLogs] = useState([]);
  const { setLat, setLng } = useContext(MapContext);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/logs/delete-log/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const newLogs = logs.filter((log) => log._id !== id);
      setLogs(newLogs);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/logs/fetch-logs`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          const loglist = response.data.logs;
          setLogs(loglist);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchLogs();
  }, []);
  return (
    <div className="child" style={{ backgroundColor: "#EEE" }}>
      <div className="container p-4">
        <div className="card" id="chat3" style={{ borderRadius: 15 }}>
          <div className="card-body">
            {logs.map((log) => (
              <div
                className="d-flex flex-row justify-content-start"
                key={log._id}
              >
                <img
                  style={{ width: 45, height: "100%" }}
                  src={`./images/${
                    localStorage.getItem("image")
                      ? localStorage.getItem("image")
                      : 5
                  }.jpg`}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                />
                <div>
                  <div className="d-flex flex-row gap-2">
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Button was Pressed at Co-ordinates ({log.lat},{log.lng}
                      ). To visualize the coordinates on the map ,
                      <Link
                        to={"/map"}
                        onClick={() => {
                          setLat(log.lat);
                          setLng(log.lng);
                        }}
                      >
                        Click Here
                      </Link>
                    </p>
                    <button
                      type="button"
                      className="btn btn-danger btn-circle d-flex justify-content-center align-items-center"
                      aria-expanded="false"
                      onClick={() => handleDelete(log._id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                    {moment(log?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
