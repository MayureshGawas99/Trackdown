import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <div className="container h-100">
      <div className="row justify-content-around align-items-center h-100 ">
        <div className="col-md-7">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            className="w-100 h-100 px-5"
          />
        </div>
        <div className="col-md-5">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24x7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@trackdownapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 1234567890
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
