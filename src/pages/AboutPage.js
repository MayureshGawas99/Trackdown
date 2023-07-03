import React from "react";
// import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <div className="row contactus justify-content-around align-items-center">
      <div className="col-md-6">
        <img
          src="/images/about.jpg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
        <p className="text-justify mt-2">
          Welcome to our location tracking website, where we provide innovative
          solutions to help you track and monitor the locations of people,
          vehicles, and assets with ease. Our platform leverages advanced
          technologies to deliver accurate and real-time location information,
          ensuring you stay connected and in control.
        </p>
      </div>
    </div>
  );
};

export default About;
