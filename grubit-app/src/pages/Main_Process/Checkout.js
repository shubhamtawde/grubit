import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./main.css";
import {loadStripe} from '@stripe/stripe-js';
import $ from 'jquery';

function Checkout() {
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51M9tn6H4aUaD7mpGXEm7IeesRTGd4rdojrGQISorJYkgcOtBOgZg7bJBzHIfIVWD3dbLSLByC1nUzy7vmtC0SlCX00cOyZ88DO";
  const STRIPE_SECRET_KEY =
    "sk_test_51M9tn6H4aUaD7mpG1d4Ulb7iED4YOb9DXCzHdPhHt8ajehHfupSiOdFwayjeKYOD0WjV1Jw0nC5WRBclldODYfsA00jbFyxfAp";
  let [cart, setCart] = useState([]);
  let [orderTotal, setOrderTotal] = useState();
  let localCart = localStorage.getItem("cart");
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies(["Token"]);
  const URL = "http://localhost:8080/api/display";
  let ignore = false;
  let total = 0;
 

  useEffect(() => {
    console.log(ignore);
    if (!ignore) {
      if (cookies.Token == null) {
        console.log("Cookies not there");
      } else {
        $('.orderButton').prop('disabled', true);
        localCart = JSON.parse(localCart);
        if (localCart) {
          setCart(localCart);
        }
        fetch(URL, {
          method: "POST",
          crossDomain: false,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json.data);
            console.log(json.data.apt);
            setData(json.data);
          });
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  function getTotal(e) {

    e.preventDefault();
    total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].qty;
    }
    total = total + (3.99 + 1.99);
    setOrderTotal(total);
    $('.orderButton').prop('disabled', false);
    
    $(".tot").text("$"+total);
    
  }

  const makePayment = async (e) => {
    e.preventDefault();
    let stripeTotal = 0;
    let stripeQty = 0;
    for (var i = 0; i < cart.length; i++) {
      stripeTotal = stripeTotal + cart[i].price * cart[i].qty;
      stripeQty = stripeQty + cart[i].qty;
    }
    console.log(stripeTotal);
    console.log(stripeQty);
    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
    const body = { cart };
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const response = await fetch(
      "http://localhost:8080/api/create-checkout-session",
      {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(
          {
             stripeTotal,
             stripeQty
          }
        ),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  console.log(cart);
  return (
    <>
      <Navbar />
      <section className="checkout">
        <div className="container">
          <form className="checkout-form">
            <div className="row main">
              <div className="col-xl-7 col-lg-7">
                <h2 className="text-start">Checkout Method</h2>
                <div className="card">
                  <h4 className="text-start">Buyer information</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Full Name"
                    disabled
                    value={data.fname + " " + data.lname}
                  />
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="E-mail"
                        disabled
                        value={data.email}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        placeholder="Phone"
                        disabled
                        value={data.phone}
                      />
                    </div>
                  </div>
                  <h4 className="mt-4 text-start">Delivery addresses</h4>
                  <input
                    type="text"
                    name="streetname"
                    className="form-control"
                    placeholder="Street"
                    required
                    value={data.streetName}
                  />
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="number"
                        name="number"
                        className="form-control"
                        placeholder="Apt/Suite"
                        required
                        value={data.apt}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="buildingname"
                        className="form-control"
                        placeholder="Building Number"
                        required
                        value={data.buildingName}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <input
                        type="number"
                        name="zipcode"
                        className="form-control"
                        placeholder="Zipcode"
                        required
                        value={data.zip}
                      />
                    </div>
                    <div className="col-lg-4">
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="Massachusettes"
                        disabled
                      />
                    </div>
                    <div className="col-lg-4">
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        placeholder="United States"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 display">
                <h2 className="text-start">Your Order</h2>
                <div className="card order-details">
                  <ul>
                    <li>
                      <p className="strong">product</p>
                      <p className="strong">total</p>
                    </li>
                    {cart.map((data) => (
                      <li>
                        <p>{data.name}</p>
                        <p>${data.price}</p>
                      </li>
                    ))}
                    <li>
                      <p className="strong">Shipping Charges</p>
                      <p className="strong">$3.99</p>
                    </li>
                    <li>
                      <p className="strong">Taxes</p>
                      <p className="strong">$1.99</p>
                    </li>

                    <li>
                      <p className="strong">Order Total</p>
                      <p className="strong tot"></p>
                    </li>
                  </ul>
                  <button type="submit" className="btn place-order mt-4 px-0 totalButton" onClick={(e) => getTotal(e)}>
                    Get Total
                  </button>
                </div>
                <div className="text-start">
                  <button type="submit" className="btn place-order mt-4 orderButton"  onClick={(e) => {makePayment(e)}} >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Checkout;
