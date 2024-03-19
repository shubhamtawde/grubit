
import "./profile.css";
import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

function ManageAccount() {
  const navigate = useNavigate();
  const [cookies, setCookie , deleteCookie] = useCookies(['Token']);
  const [form, setForm] = useState({
    
    email:"",
    phone: "",
    streetName: "",
    apt: "",
    buildingName: "",
    zip: ""
  });

  const URL = "http://localhost:8080/api/changePhone";
  const URL_address = "http://localhost:8080/api/address";
  const URL_fetchdata = "http://localhost:8080/api/displayName";
  const URL_deleteUser = "http://localhost:8080/api/deleteUser";

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
            console.log(json);
            setData(json.data);
            console.log(data.full_name);
          })
      }
    }

    return () => { ignore = true; }
  }, [])

  function changePhone(e) {
    e.preventDefault();
    var phone = form.phone;

    console.log(phone);

    fetch(URL, {
      method: "POST",
      crossDomain: false,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          alert("Phone updated Successfully");

        }
        else {
          alert(data.error);
        }
      });


  }

  function address(e) {
    e.preventDefault();
    var phone = form.phone;
    var streetName = form.streetName;
    var apt = form.apt;
    var buildingName = form.buildingName;
    var zip = form.zip;

    fetch(URL_address, {
      method: "POST",
      crossDomain: false,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        streetName,
        apt,
        buildingName,
        zip
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          alert("Address updated Successfully");

        }
        else {
          alert(data.error);
        }
      });


  }


  //function to delete user
  function deleteUser(e) {
    e.preventDefault();
    var email = form.email;
    fetch(URL_deleteUser, {
      method: "DELETE",
      crossDomain: false,
      credentials: "include",
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
          alert("User deleted Successfully");
          localStorage.removeItem("fname");
          localStorage.removeItem("lname");
          deleteCookie('Token');
          navigate("/");

        }
        else {
          alert(data.error);
        }
      });


  }


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "phone") {
      setForm({ ...form, phone: value });
    }
    if (name == "streetName") {
      setForm({ ...form, streetName: value });
    }
    if (name == "apt") {
      setForm({ ...form, apt: value });
    }
    if (name == "buildingName") {
      setForm({ ...form, buildingName: value });
    }
    if (name == "zip") {
      setForm({ ...form, zip: value });
    }

  };

  return (

    <>
      <Navbar />
      <section className="profile">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 mb-4">
              <div className="profile-card">
                <form action="#" className="profile-form-wrap">
                  <div className="row gx-5">
                    <div className="col-lg-12">
                      <div className="profile-title text-start">
                        <h2>Profile</h2>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-field text-start">
                        <label for="firstName">Name</label>
                        <input
                          name="full_name"
                          id="full_name"
                          type="text"
                          className="form-control mt-3"
                          placeholder=""
                          value={data.fname}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-field text-start">
                        <label for="lastName">Last Name</label>
                        <input
                          name="name"
                          id="lastName"
                          type="text"
                          className="form-control mt-3"
                          placeholder=""
                          value={data.lname}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-field text-start">
                        <label for="email">Email</label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          value={data.email}
                          className="form-control mt-3"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-field text-start">
                        <label for="phone">Phone Number</label>
                        <input
                          name="phone"
                          id="phone"
                          type="number"
                          className="form-control mt-3"
                          placeholder="Phone Number"
                          value={data.phone}
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-btn text-start">
                        <button
                          type="submit"
                          className="profile-button btn  mt-3"
                          onClick={(e) => changePhone(e)}
                        >
                          Save Personal Details
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-8 mt-5">
              <div className="profile-card">
                <form action="#" className="profile-form-wrap">
                  <div className="row gx-5">
                    <div className="col-lg-12">
                      <div className="profile-title text-start">
                        <h2>Billing Address</h2>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-field text-start">
                        <label for="streetName">Street Name</label>
                        <input
                          name="streetName"
                          id="streetName"
                          type="text"
                          className="form-control mt-3"
                          placeholder="Street Name"
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-field text-start">
                        <label for="apt">Apt/Suite</label>
                        <input
                          name="apt"
                          id="apt"
                          type="text"
                          className="form-control mt-3"
                          placeholder="Apt/Suite"
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-field text-start">
                        <label for="buildingName">Building Name</label>
                        <input
                          name="buildingName"
                          id="buildingName"
                          type="text"
                          className="form-control mt-3"
                          placeholder="Building Name"
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-field text-start">
                        <label for="zipcode">ZipCode</label>
                        <input
                          name="zip"
                          id="zip"
                          type="number"
                          className="form-control mt-3"
                          placeholder="ZipCode"
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-field text-start">
                        <label for="state">State</label>
                        <input
                          name="state"
                          id="state"
                          type="text"
                          className="form-control mt-3"
                          placeholder="Massachusetts"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-field text-start">
                        <label for="country">Country</label>
                        <input
                          name="country"
                          id="country"
                          type="text"
                          className="form-control mt-3"
                          placeholder="United States"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-btn text-start">
                        <button
                          type="submit"
                          className="profile-button btn  mt-3"
                          onClick={(e) => address(e)}
                        >
                          Save Billing Details
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-8 mt-5">
              <div className="profile-card">
                <form action="#" className="profile-form-wrap">
                  <div className="row gx-5">
                    <div className="col-lg-12">
                      <div className="profile-title text-start">
                        <h2>Do you want to delete your account?</h2>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-btn text-start">
                        <button
                          type="submit"
                          className="profile-button btn  mt-3"
                          onClick={(e) => deleteUser(e)}
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ManageAccount;
