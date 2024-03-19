import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import { useCookies } from 'react-cookie';
import $ from 'jquery';

function SignIn() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['Token']);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (cookies.Token == null) {
      console.log("Cookies not there");
    }
    else {
      navigate('/home');
    }
  });

  const URL = "http://localhost:8080/api/login";


  function signIn(e) {

    e.preventDefault();
    console.log(form.email, form.password);
    var email = form.email;
    var password = form.password;
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          alert("Login Successful! Welcome ");
          setCookie('Token', data.data, { path: '/', maxAge: 1000 * 60 * 60 * 24 * 90 });
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

    if (name == "email") {
      setForm({ ...form, email: value });
    }

    if (name == "password") {
      setForm({ ...form, password: value });
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
    <section id="signin" className="signin mt-5" style={{ padding: "150px 0px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="wrap">
              <div className="login-wrap p-md-4">

                <div className="w-100">
                  <h3 className="mb-4">Sign In to Your Account</h3>
                </div>

                <form action="index.html" className="signin-form">
                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" for="username">Username</label>
                    <input type="text" className="form-control" name="email" required onChange={(e) => handleChange(e)} />

                  </div>
                  <div className="form-group">
                    <label className="form-control-placeholder" for="password">Password</label>
                    <input id="password-field" type="password" name="password" className="form-control" required onChange={(e) => handleChange(e)} />
                    <span toggle="#password-field"
                      className="bi bi-eye-slash field-icon toggle-password" onClick={(e) => passwordClick(e)}></span>
                  </div>
                  <div className="form-group">
                    <button type="submit"
                      className="form-control btn btn-primary rounded btn-submit px-" onClick={(e) => signIn(e)}>Sign
                      In</button>
                  </div>
                  <div className="form-group d-md-flex justify-content-between">
                    <div className="text-left">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
                        <label className="form-check-label">Remember Me</label>
                      </div>
                    </div>
                    <div className="text-md-right">
                      <Link to="/forgetPassword">Forgot Password?</Link>
                      {/* <a href="forget-password.html">Forgot Password?</a> */}
                    </div>
                  </div>
                </form>
                <p className="text-center">Not a member ?
                  <Link className="signup" to="/signUp">  Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn
