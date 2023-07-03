import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <div className="row contactus justify-content-around align-items-center">
      <div className="col-md-6">
        <img
          src="/images/contactus.jpg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
        <p className="text-justify mt-2">
          any query and info about product feel free to call anytime we 24x7
          available
        </p>
        <p className="mt-3">
          <BiMailSend /> : www.help@commerceapp.com
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : +91 1234567890
        </p>
        <p className="mt-3">
          <BiSupport /> : 1800-0000-0000 (toll free)
        </p>
      </div>
    </div>
  );
};

export default Contact;
