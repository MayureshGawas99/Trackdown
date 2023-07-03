import React, { useContext, useEffect } from "react";
import GoogleMap from "../components/GoogleMap";
import { useNavigate } from "react-router-dom";
import { getUserFromEmail, selectData } from "../firebaseconfig/CRUD";
import { MapContext } from "../App";
import Footer from "../components/Footer";

export default function HomePage() {
  const { cords, setCords, db } = useContext(MapContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  setInterval(() => {
    getcordinates(db);
  }, 120000);

  const getcordinates = async (db) => {
    try {
      const localemail = localStorage.getItem("email");
      const ans = getUserFromEmail(localemail);
      const res = await selectData(db, ans);
      const newcords = cords.concat([
        { lat: parseFloat(res.lat), lng: parseFloat(res.lng) },
      ]);
      setCords(newcords);
      console.log(cords);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2 className="text-center">Live Location</h2>
      {/* <CRUD /> */}
      {/* <button
        onClick={() => {
          getcordinates(db);
        }}
      >
        get Cord
      </button> */}
      {cords.length !== 0 && <GoogleMap />}
      <Footer />
    </div>
  );
}
