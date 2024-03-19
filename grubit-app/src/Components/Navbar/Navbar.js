import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import './navbar.css'
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';



function Navbar() {
    const navigate = useNavigate();
    const [cookies, setCookie, deleteCookie] = useCookies(['Token']);

    const [form, setForm] = useState({

        email: "",
        phone: "",
        streetName: "",
        apt: "",
        buildingName: "",
        zip: ""
    });


    const URL_fetchdata = "http://localhost:8080/api/displayName";

    const [data, setData] = useState([]);
    let ignore = false;

    useEffect(() => {
        console.log(ignore);
        if (!ignore) {
            if (cookies.Token == null) {
                console.log("Cookies not there");
            }
            else {
                fetch(URL_fetchdata, {
                    method: "POST",
                    crossDomain: false,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json.data.fname);
                        console.log(json.data.lname);
                        localStorage.setItem("fname", json.data.fname);
                        localStorage.setItem("lname", json.data.lname);
                        setData(json.data);

                    })
            }
        }

        return () => { ignore = true; }
    }, [])

    function logout(e) {
        console.log("inside logout");
        e.preventDefault();
        localStorage.removeItem("fname");
        localStorage.removeItem("lname");
        deleteCookie('Token');
        navigate("/");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-1" id="mainNav">
            <div className="container-fluid px-5">
                <Link class="navbar-brand d-flex align-items-center" to="/home">
                    <img src="./images/Grubit-logos_black.png" height="60" />
                    <h3 className="logo_text ml-4 mt-2"> Grubit</h3>
                </Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item">
                            <Link class="nav-link" to="/home">
                                Home
                            </Link>
                        </li>
                        
                        <NavDropdown title={<span><i className="bi bi-person pe-1" ></i> {data.fname + " " + data.lname}</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item className="dropdown-list">
                                <Link to='/manageAccount'> Manage Account </Link></NavDropdown.Item>
                            <NavDropdown.Divider />

                            <NavDropdown.Item className="dropdown-list">
                                <Link to='/orderhistory'> Order History </Link></NavDropdown.Item>
                        </NavDropdown>
                        <li class="nav-item">
                            <Link className="nav-link" to='/cart'><i class="bi bi-cart"></i></Link>
                        </li>
                        <li className="nav-item" >
                            <Link className="nav-link" onClick={(e) => logout(e)}>
                                <i class="bi bi-box-arrow-right pe-2" ></i>Logout
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar