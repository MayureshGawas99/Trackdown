import "./App.css";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { SnackbarProvider } from "notistack";
import Pagenotfound from "./pages/Pagenotfound";
import ProfilePage from "./pages/ProfilePage";
import LogPage from "./pages/LogPage";
import Avatar from "./pages/Avatar";

export const MapContext = createContext();
export const UserContext = createContext();

function App() {
  const [mapstate, setMapstate] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });
  const [cords, setCords] = useState({ lat: 19.146342, lng: 72.931738 });
  const [time, setTime] = useState(120);
  const mapData = {
    mapstate,
    setMapstate,
    cords,
    setCords,
    time,
    setTime,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mac, setMac] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const userData = {
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
  };

  return (
    <BrowserRouter>
      <MapContext.Provider value={mapData}>
        <UserContext.Provider value={userData}>
          <div className="root">
            <Navbar />
            <SnackbarProvider />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/avatar" element={<Avatar />} />
              <Route path="/logs" element={<LogPage />} />
              <Route path="/*" element={<Pagenotfound />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </MapContext.Provider>
    </BrowserRouter>
  );
}

export default App;
