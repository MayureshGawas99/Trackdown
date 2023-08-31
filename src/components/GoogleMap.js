import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { useContext } from "react";
import { MapContext } from "../App";

function GoogleMap(props) {
  const { mapstate, setMapstate, cords } = useContext(MapContext);

  const onMarkerClick = (props, marker, e) =>
    setMapstate({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  const onMapClicked = (props) => {
    if (mapstate.showingInfoWindow) {
      setMapstate({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "79vh",
    display: "flex",
    justifyContent: "center",
  };
  const mapStyle = {
    width: "100%",
    height: "79vh",
  };
  return (
    <Map
      style={mapStyle}
      containerStyle={containerStyle}
      google={props.google}
      zoom={14}
      center={cords}
      initialCenter={cords}
      onClick={onMapClicked}
    >
      {/* <Polyline
        path={cords}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      /> */}
      <Marker
        title={"The marker`s title will appear as a tooltip."}
        position={cords}
        onClick={onMarkerClick}
        name={"Current location "}
      />

      <InfoWindow
        marker={mapstate.activeMarker}
        visible={mapstate.showingInfoWindow}
      >
        <div>
          <h1>{mapstate.selectedPlace.name}</h1>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(GoogleMap);
