import React from "react";
import { Link } from "react-router-dom";

export default function Dropdown(props) {
  const info = localStorage.getItem("info");
  const infojson = JSON.parse(info);
  return (
    <>
      <ul className="navbar-nav">
        {/* Avatar */}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle d-flex align-items-center p-0"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            // data-mdb-toggle="dropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={infojson.pic}
              className="rounded-circle"
              height={32}
              width={32}
              alt="Avatar"
              loading="lazy"
            />
          </a>
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
        </li>
      </ul>

      {/* <div className="btn-group ">
       
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
      </div> */}
    </>
  );
}
