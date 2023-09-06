import React from "react";
import { Link } from "react-router-dom";

export default function Dropdown(props) {
  return (
    <div className="btn-group ">
      {/* <button
        type="button"
        className="btn btn-primary "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src={profile} alt="" />
      </button> */}
      <div className="">
        <button
          type="button"
          className="btn btn-primary btn-circle d-flex justify-content-center align-items-center"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="material-symbols-outlined">person</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/logs">
              Logs
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" onClick={props.handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
