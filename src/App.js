import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import StartFirebase from "./firebaseconfig/firebase";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { SnackbarProvider } from "notistack";
import { getUserFromEmail, selectData } from "./firebaseconfig/CRUD";
import Pagenotfound from "./pages/Pagenotfound";

export const MapContext = createContext();
function App() {
  const [db, setDb] = useState(null);

  const [mapstate, setMapstate] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });
  const [email, setEmail] = useState("");
  // { lat: 19.2183, lng: 72.9781 }
  let [cords, setCords] = useState([]);
  useEffect(() => {
    getdb(db);
  }, []);

  const getdb = async (db) => {
    try {
      const newdb = await StartFirebase();
      setDb(newdb);
      const localemail = localStorage.getItem("email");
      const ans = getUserFromEmail(localemail);
      const res = await selectData(newdb, ans);
      const newcords = cords.concat([
        { lat: parseFloat(res.lat), lng: parseFloat(res.lng) },
      ]);
      setCords(newcords);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <MapContext.Provider
        value={{
          mapstate,
          setMapstate,
          cords,
          setCords,
          db,
          setDb,
          email,
          setEmail,
        }}
      >
        <div>
          <Navbar />
        </div>
        <SnackbarProvider />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<Pagenotfound />} />
        </Routes>
      </MapContext.Provider>
    </BrowserRouter>
  );
}

export default App;
