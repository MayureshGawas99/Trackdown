import React, { useContext } from "react";
import Footer from "../components/Footer";
import GoogleMap from "../components/GoogleMap";
import { MapContext } from "../App";

export default function MapPage() {
  const { lat, setLat, lng, setLng } = useContext(MapContext);
  const newcords = { lat, lng };

  return (
    <div className="child">
      <h2 className="text-center">Live Map</h2>
      <GoogleMap cordinates={newcords} />
      <div className="fixed-bottom pt-1 ">
        <div className="d-flex flex-row gap-2" style={{ width: "40rem" }}>
          <div className="d-flex flex-row align-items-baseline gap-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Latitude
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
          <div className="d-flex flex-row align-items-baseline gap-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Longitude
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
