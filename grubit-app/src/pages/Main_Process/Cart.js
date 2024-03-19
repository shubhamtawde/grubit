import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import './main.css'


function Cart() {

    let [cart, setCart] = useState([]);
    let [orderTotal, setOrderTotal] = useState();
    let localCart = localStorage.getItem("cart");
    const [data, setData] = useState([]);
    const [cookies, setCookie] = useCookies(["Token"]);

    let ignore = false;
    let total = 0;

    useEffect(() => {
        console.log(ignore);
        if (!ignore) {
            if (cookies.Token == null) {
                console.log("Cookies not there");
            } else {
                localCart = JSON.parse(localCart);
                if (localCart) {
                    setCart(localCart);

                }
            }
        }

        return () => {
            ignore = true;
        };
    }, []);


    return (
        <>
            <Navbar />
            <section className="cart" style={{ marginTop: "70px" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-10">

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                <div>

                                </div>
                            </div>

                            <div className="card rounded-3 shadow border-0 mb-4">
                                {cart.map((data) => (
                                    <div className="card-body p-4">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            
                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                <p className="lead fw-normal mb-2">{data.name}</p>


                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                <p className="lead fw-normal mb-2">{data.qty}</p>
                                                <button className="btn btn-link px-2"
                                                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                                    <i className="fas fa-minus"></i>
                                                </button>


                                                <button className="btn btn-link px-2"
                                                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                <h5 className="mb-0">${data.price}</h5>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>



                                ))}

                            </div>
                            <div className="text-start mt-5">
                            <Link to={'/checkout'}>
                                <button type="button" className="btn proceed" >Proceed to Pay</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Cart