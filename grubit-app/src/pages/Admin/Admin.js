
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import './admin.css'

function Admin() {
    const [data, setData] = useState([]);
    const [cookies, setCookie , deleteCookie] = useCookies(['Token']);
    let ignore = false;

    const URL = "http://localhost:8080/api/getAllOrders";

    useEffect(() => {
        console.log(ignore);
        if (!ignore) {
            if (cookies.Token == null) {
                console.log("Cookies not there");
            }
            else {
                fetch(URL, {
                    method: "GET",
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
                        console.log(json);
                        setData(json.data);

                    })
            }
        }

        return () => { ignore = true; }
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNavbar">
                <a className="navbar-brand" href="index.html">Grubit Admin </a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                        <li className="nav-item">
                            <Link to='/admin' className="nav-link">Order Confirmation</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin1' className="nav-link">Booking Confirmation</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav sidenav-toggler">
                        <li className="nav-item">
                            <a className="nav-link text-center" id="sidenavToggler">
                                <i className="fa fa-fw fa-angle-left"></i>
                            </a>
                        </li>
                    </ul>

                </div>
            </nav>
            <div className="content-wrapper" style={{ marginTop: "80px" }}>
                <div className="container-fluid">
                    <div id="order">
                        <ol className="breadcrumb text-start">
                            <li className="breadcrumb-item">
                                <Link to='/admin' className="nav-link">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">View Order History</li>
                        </ol>

                        <div className="card mb-3">
                            <div className="card-header text-start">Order Confirmation</div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr className='text-start'>
                                                <th>Full Name</th>
                                                <th>Restaurant Name</th>
                                                <th>Product Name</th>
                                                <th>Product Items</th>
                                                <th>Total Bill</th>
                                            </tr>
                                        </thead>

                                        <tbody className='text-start'>
                                            {data.map((data) => (

                                                <tr className="text-start">
                                                    <th>{data.fname +" " +data.lname}</th>
                                                    <th>{data.restaurantName}</th>
                                                    <th>{data.productName}</th>
                                                    <th>{data.productItem}</th>
                                                    <th>{data.total}</th>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default Admin