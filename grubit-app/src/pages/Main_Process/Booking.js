import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import './main.css'

function Booking() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        time: "",
        tableSize: "",
        date: "",
        message: ""
    });

    const URL = "http://localhost:8080/api/booking";

    function clubBooking(e) {
        e.preventDefault();
        var name = form.name;
        var email = form.email;
        var phone = form.phone;
        var time = form.time;
        var tableSize = form.tableSize;
        var date = form.date;
        var message = form.message;


        fetch(URL, {
            method: "POST",
            crossDomain: false,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                time,
                tableSize,
                date,
                message
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == "ok") {
                    alert("Booking Succesful ! ");
                    navigate("/home");
                }
                else {
                    alert(data.error);
                }
            });


    }


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == "name") {
            setForm({ ...form, name: value });
        }
        if (name == "email") {
            setForm({ ...form, email: value });
        }
        if (name == "phone") {
            setForm({ ...form, phone: value });
        }
        if (name == "time") {
            setForm({ ...form, time: value });
        }
        if (name == "tableSize") {
            setForm({ ...form, tableSize: value });
        }
        if (name == "date") {
            setForm({ ...form, date: value });
        }
        if (name == "message") {
            setForm({ ...form, message: value });
        }
    };

    return (

        <>
            <Navbar />
            <section className="booking-table padding-tb">

                <div className="container">
                    <div className="section-header">
                        <h3>Book a Online Table</h3>
                    </div>
                    <div className="section-wrapper mt-5">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-6 col-12">
                                <div className="bg-table"></div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="contact-form">
                                    <form action="#">
                                        <input type="text" className="form-control" name="name" placeholder="Your Name" required  onChange={(e) => handleChange(e)} />
                                        <input type="email" className="form-control" name="email" placeholder="Your Email" required  onChange={(e) => handleChange(e)} />
                                        <input type="text" className="form-control" name="phone" placeholder="Phone Number" required onChange={(e) => handleChange(e)} />
                                        <div className="res-tab time-zone">
                                            <select name="time" onChange={(e) => handleChange(e)}>
                                                <option value="0" selected>Enter Time</option>
                                                <option value="6.00 PM">6:00 PM</option>
                                                <option value="6:30 PM">6:30 PM</option>
                                                <option value="7:00 PM">7:00 PM</option>
                                                <option value="7:30 PM">7:30 PM</option>
                                                <option value="8:00 PM">8:00 PM</option>
                                                <option value="8:30 PM">8:30 PM</option>
                                                <option value="9:00 PM">9:00 PM</option>
                                                <option value="9:30 PM">9:30 PM</option>
                                            </select>
                                        </div>
                                        <div className="res-tab table-zone">
                                            <select name="tableSize" onChange={(e) => handleChange(e)}>
                                                <option value="0" selected>Table Size</option>
                                                <option value="1">2</option>
                                                <option value="2">3</option>
                                                <option value="3">4</option>
                                                <option value="4">5</option>
                                                <option value="5">Full Size Table</option>
                                            </select>
                                        </div>
                                        <input type="date" name="date" data-provide="datepicker" onChange={(e) => handleChange(e)}/>
                                        <textarea name="message" rows="6" placeholder="Message" onChange={(e) => handleChange(e)}></textarea>
                                        <button type="submit" className="food-btn" onClick={(e) => clubBooking(e)}>Book a table</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Booking