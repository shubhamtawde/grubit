import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';

function ForgetPass() {
    //$('.otp-div, .otp-form, .newPass, .newPassForm').hide(); //use ComponentWillMount lifecycle
    const navigate = useNavigate(); 
    const [form, setForm] = useState({
        email: "",
        password: "",
        ConfirmPass: "",
        otp: ""
    });

    const URL =             "http://localhost:8080/api/forgotpass";
    const URL_otp =         "http://localhost:8080/api/validateOtp";
    const URL_changePass =  "http://localhost:8080/api/changePass";

    function ForgetPass(e) {
        
        e.preventDefault();
        console.log(form.email);
        var email = form.email;
        fetch(URL, {
            method: "PUT",
            crossDomain: false,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email  
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == "ok") {
                    alert("OTP has been sent!");
                    $('.otp-div, .otp-form').show();
                    $('.emailTxt').prop('disabled', true);
                    $('.emailBtn').prop('disabled', true);
                }
                else {
                    alert(data.error);
                }
            });
    }

    function validateOtp(e) {
        e.preventDefault();
        var otp = form.otp;
        var email = form.email;
        console.log(otp);
        fetch(URL_otp, {
            method: "POST",
            crossDomain: false,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,otp
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == "ok") {
                    alert("OTP has been verified!");
                    $('.newPass, .newPassForm').show();
                    $('.otpTxt').prop('disabled', true);
                    $('.otpBtn').prop('disabled', true);
                }
                else {
                    alert(data.error);
                }
            });
    }

    function changePass(e) {
        e.preventDefault();
        console.log(form.email, form.password);
        var email = form.email;
        var password = form.password;
        var ConfirmPass = form.confirmPass;
        
        console.log(password);
        console.log(ConfirmPass);
        

        if(password != ConfirmPass)
        {
            alert("Password and Confirm password are not same");
        }
        else
        {
            fetch(URL_changePass, {
                method: "PUT",
                crossDomain: false,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status == "ok") {
                        alert("Password Changed Successfully ");
                        navigate('/');
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
        if (name == "otp") {
            setForm({ ...form, otp: value });
        }
        if (name == "password") {
            setForm({ ...form, password: value });
        }
        if (name == "confirmPass") {
            setForm({ ...form, confirmPass: value });
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
        <section id="signin" className="signin" style={{ padding: "100px 0px" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="wrap">
                            <div className="login-wrap py-1 p-md-4">
                                <div className="w-100">
                                    <h3 className="mb-4 text-start">Forgot Password?</h3>
                                    <p className="text-start">Please specify your email address to receive instructions for resetting it. If an
                                        account exists by that email, we will send a password reset</p>
                                </div>
                                <form action="#" className="signin-form">
                                    <div className="form-group mt-3">
                                        <label className="form-control-placeholder" for="email">Email : </label>
                                        <input type="email" className="form-control emailTxt" name="email" required onChange={(e) => handleChange(e)} />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit"
                                            className="form-control emailBtn btn btn-primary rounded btn-submit px-" onClick={(e) => ForgetPass(e)}>Confirm
                                            Email</button>
                                    </div>
                                </form>
                                <div className="w-100 otp-div">
                                    <h3 className="mb-2 text-start">Please enter the one time password to verify your account</h3>
                                    <p className="text-start">A code has been sent to  <b>"{form.email}"</b></p>
                                </div>
                                <form action="#" className="signin-form otp-form">
                                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2 mb-4">
                                        <input className="m-2 text-center otpTxt form-control rounded" type="text" id="otp" name="otp"
                                            maxlength="6" onChange={(e) => handleChange(e)} />
                                     
                                    </div>
                                    <div className="form-group otp-submit">
                                        <button type="submit"
                                            className="form-control otpBtn btn btn-primary rounded btn-submit px-" onClick={(e) => validateOtp(e)}>Validate</button>
                                    </div>
                                </form>
                                <div className="w-100 newPass">
                                    <h3 className="mb-4">Create New Password</h3>
                                </div>
                                <form action="#" className="signin-form newPassForm">
                                    <div className="form-group">
                                        <label className="form-control-placeholder" for="password">Create New Password</label>
                                        <input id="password-field" type="password" className="form-control" name="password" required onChange={(e) => handleChange(e)}/>
                                        <span toggle="#password-field"
                                            className="bi bi-eye-slash field-icon toggle-password" onClick={ (e) => passwordClick(e)}></span>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-placeholder" for="password">Confirm Password</label>
                                        <input id="password-field1" type="password" className="form-control" name="confirmPass" required onChange={(e) => handleChange(e)}/>
                                        <span toggle="#password-field"
                                            className="bi bi-eye-slash field-icon toggle-password" onClick={ (e) => passwordClick(e)}></span>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                            className="form-control btn btn-primary rounded btn-submit px-" onClick={(e) => changePass(e)}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgetPass
