import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./main.css";
import { loadStripe } from '@stripe/stripe-js';

function Success() {
    const [cookies, setCookie] = useCookies(["Token"]);
    let [cart, setCart] = useState([]);
    let ignore = false;
    let localCart = localStorage.getItem("cart");
    let fname = localStorage.getItem("fname");
    let lname = localStorage.getItem("lname");

    let resName = localStorage.getItem("resName");
    const URL = "http://localhost:8080/api/newOrder";

    useEffect(() => {
        console.log(ignore);
        if (!ignore) {
            if (cookies.Token == null) {
                console.log("Cookies not there");
            } else {
                localCart = JSON.parse(localCart);
                console.log(localCart)
                if (localCart) {
                    setCart(localCart);
                }
                console.log(fname + lname);
                fetch(URL, {
                    method: "POST",
                    crossDomain: false,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        fname,
                        lname,
                        resName,
                        localCart,
                    }),
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json.data);
                        localStorage.removeItem("cart");
                        localStorage.removeItem("resName");
                    });
            }
        }

        return () => {
            ignore = true;
        };
    }, []);


    console.log(cart);
    return (
        <>
            <Navbar />
            <section className="restaurants mb-5">
                <div className="restaurant-title mt-5 mb-0 p-sm-5">
                    <h2 className="mb-0">Order Succesful!</h2>
                </div></section>
            <Footer />
        </>
    );
}

export default Success;
