import React, { useContext, useEffect } from "react";
import GoogleMap from "../components/GoogleMap";
import { useNavigate } from "react-router-dom";
import { MapContext } from "../App";
import Footer from "../components/Footer";
import axios from "axios";

export default function HomePage() {
  const { cords, setCords, setTime } = useContext(MapContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/cords/fetchcords`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          const { lat, lng } = response.data.cords;
          let newCords = { lat: lat, lng: lng };
          setCords(newCords);
          // console.log(cords);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    // Function to update the time remaining
    const updateRemainingTime = () => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 120)); // Reset to 2 minutes if time is up
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 2 minutes
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 120000); // 2 minutes in milliseconds

    // Set up an interval to update the time remaining every second
    const timeIntervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    // Clean up intervals when the component unmounts
    return () => {
      clearInterval(intervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  return (
    <div className="child">
      <h2 className="text-center">Live Location</h2>
      {/* {cords && <GoogleMap />} */}
      <Footer />
    </div>
  );
}
