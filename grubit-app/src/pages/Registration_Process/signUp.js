import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import $ from 'jquery';

function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        ConfirmPass: "",
        fname: "",
        lname: "",
        phone: ""
    });

    const URL = "http://localhost:8080/api/insert";

    function signUp(e) {
        e.preventDefault();
        console.log(form.email, form.password);
        var email = form.email;
        var password = form.password;
        var ConfirmPass = form.ConfirmPass;
        var fname = form.fname;
        var lname = form.lname;
        var phone = form.phone;
        console.log(password);
        console.log(phone);

        if (password != ConfirmPass) {
            alert("Password and Confirm password are not same");
        }
        else {
            fetch(URL, {
                method: "POST",
                crossDomain: false,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    password,
                    fname,
                    lname,
                    phone
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status == "ok") {
                        alert("Sign Up Successful! Welcome ");
                        navigate("/");
                    }
                    else {
                        alert(data.error);
                    }
                });
        }

    }


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name == "email") {
            setForm({ ...form, email: value });
        }

        if (name == "password") {
            setForm({ ...form, password: value });
        }
        if (name == "ConfirmPass") {
            setForm({ ...form, ConfirmPass: value });
        }


        if (name == "fname") {
            setForm({ ...form, fname: value });
        }

        if (name == "lname") {
            setForm({ ...form, lname: value });
        }

        if (name == "phone") {
            setForm({ ...form, phone: value });
        }
    };
    const passwordClick = (e) => {
        $(".toggle-password").on("click", function () {
            $(this).toggleClass("bi-eye");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
    }

    return (
        <section id="signin" className="signin mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="wrap">
                            <div className="login-wrap p-md-4">

                                <div className="w-100">
                                    <h3 className="mb-4">Sign In to Your Account</h3>
                                </div>

                                <form action="#" className="signin-form">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group mt-3">
                                                <label className="form-control-placeholder" for="firstname">First Name</label>
                                                <input type="text" className="form-control" name="fname" required onChange={(e) => handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group mt-3">
                                                <label className="form-control-placeholder" for="lastname">Last Name</label>
                                                <input type="text" className="form-control" name="lname" required onChange={(e) => handleChange(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-0">
                                        <label className="form-control-placeholder" for="email">Email</label>
                                        <input type="email" className="form-control" name="email" required onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label className="form-control-placeholder" for="number">Phone Number</label>
                                        <input type="number" className="form-control" name="phone" required onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-placeholder" for="password">Create New Password</label>
                                        <input id="password-field" type="password" className="form-control" name="password" required onChange={(e) => handleChange(e)} />
                                        <span toggle="#password-field"
                                            className="bi bi-eye-slash field-icon toggle-password" onClick={ (e) => passwordClick(e)}></span>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-placeholder" for="password">Confirm Password</label>
                                        <input id="password-field" type="password" className="form-control" name="ConfirmPass" required onChange={(e) => handleChange(e)} />
                                        <span toggle="#password-field"
                                            className="bi bi-eye-slash field-icon toggle-password" onClick={ (e) => passwordClick(e)}></span>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                            className="form-control btn btn-primary rounded btn-submit px-" onClick={(e) => signUp(e)}>Sign
                                            Up</button>
                                    </div>

                                </form>
                                <p className="text-center">Already Have An Account ?
                                    <Link className="signup" to="/"> SignIn</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp
