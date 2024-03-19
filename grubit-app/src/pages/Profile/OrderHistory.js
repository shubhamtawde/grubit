
import "./profile.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

function OrderHistory() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['Token']);
    const [form, setForm] = useState({


        productName: "",
        productItem: "",
        total: "",

    });

    const URL = "http://localhost:8080/api/fetchOrderHistory";

    const [data, setData] = useState([]);
    let ignore = false;

    useEffect(() => {
        console.log(ignore);
        if (!ignore) {
            if (cookies.Token == null) {
                console.log("Cookies not there");
            }
            else {
                fetch(URL, {
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
                        console.log(json);
                        setData(json.data);

                    })
            }
        }

        return () => { ignore = true; }
    }, [])

    return (
        <>
            <Navbar />
            <section className="shop-cart padding-tb">
                <div className="container">
                    <h2 className="text-center mt-3 mb-4">View Order History</h2>
                    <div className="section-wrapper">
                        <div className="cart-top">
                            <table>
                                <thead>
                                    <tr className="text-start">
                                        <th>Restaurant Name</th>
                                        <th>Product Items</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-start">
                                    {data.map((data) => (

                                        <tr className="text-start">
                                            <th>{data.productName}</th>
                                            <th>{data.productItem}</th>
                                            <th>${data.total}</th>
                                        </tr>


                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default OrderHistory