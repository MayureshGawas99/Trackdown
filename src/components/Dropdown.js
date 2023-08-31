import React from "react";
import { Link } from "react-router-dom";

export default function Dropdown(props) {
  return (
    <div class="btn-group ">
      {/* <button
        type="button"
        class="btn btn-primary "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src={profile} alt="" />
      </button> */}
      <div className="">
        <button
          type="button"
          class="btn btn-primary btn-circle d-flex justify-content-center align-items-center"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="material-symbols-outlined">person</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <Link class="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" to="/logs">
              Logs
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" onClick={props.handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
