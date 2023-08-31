import React from "react";
// import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <div className="container h-100">
      <div className="row justify-content-around align-items-center h-100 ">
        <div className="col-md-7 ">
          <img
            src="/images/about.jpg"
            alt="contactus"
            className="w-100 h-100 px-5"
          />
        </div>

        <div className="col-md-5">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            Welcome to our location tracking website, where we provide
            innovative solutions to help you track and monitor the locations of
            people, vehicles, and assets with ease. Our platform leverages
            advanced technologies to deliver accurate and real-time location
            information, ensuring you stay connected and in control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
