import React from "react";
import { useNavigate } from "react-router-dom";

export default function Avatar() {
  const arr = [1, 2, 3, 4, 5, 6];
  const navigate = useNavigate();
  return (
    <div className="container  ">
      {/* d-flex flex-wrap justify-content-evenly  align-items-center */}
      <div className="row p-3">
        {arr.map((ele) => (
          <div
            className="col-md-3 mb-3 d-flex justify-content-center"
            key={ele}
          >
            <div key={ele} className="card  " style={{ width: "15rem" }}>
              <img
                src={`./images/${ele}.jpg`}
                className="card-img-top"
                alt="Avatar"
              />
              <div className="card-body d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    localStorage.setItem("image", ele);
                    navigate("/profile");
                  }}
                >
                  Choose
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
