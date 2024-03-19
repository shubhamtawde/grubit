import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

function Menu(props) {
  const location = useLocation();
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem("cart");
  let resN = localStorage.getItem("resName");
  console.log(location);
  var resName = location.state.name;
  var resAdd = location.state.add;

  const [data, setData] = useState([]);
  const [reviewData, setreviewData] = useState([]);
  const [bestSell, setBestSell] = useState([]);
  const [cookies, setCookie] = useCookies(["Token"]);
  const URL = "http://localhost:8080/api/fetchMenu";
  const reviewURL = "http://localhost:8080/api/fetchReviews";
  const bestURL = "http://localhost:8080/api/fetchBestSelling";
  let ignore = false;

  useEffect(() => {
    console.log(ignore);
    if (!ignore) {
      if (cookies.Token == null) {
        console.log("Cookies not there");
      } else {
        //turn it into js
        localCart = JSON.parse(localCart);
        //load persisted cart into state if it exists
        if (localCart) setCart(localCart);
        var id = location.state.id;
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
            id,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json.data);
            setData(json.data);
          });
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  console.log(data);

  function getReviews(e) {
    e.preventDefault();
    if (!ignore) {
      if (cookies.Token == null) {
        console.log("Cookies not there");
      } else {
        var id = location.state.id;
        fetch(reviewURL, {
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
            setreviewData(json.data);
          });
      }
    }
  }

  function getBestSelling(e) {
    e.preventDefault();
    if (!ignore) {
      if (cookies.Token == null) {
        console.log("Cookies not there");
      } else {
        var id = location.state.id;
        fetch(bestURL, {
          method: "POST",
          crossDomain: false,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            id,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("BEST SELLING: " + json.data);
            setBestSell(json.data);
          });
      }
    }
  }

  const addItem = (item, itemPrice) => {
    let cartCopy = [...cart];

    let name = item;
    let price = itemPrice;
    let actPrice = price.split("$")[1];
    console.log(actPrice);
    console.log(name);
    const order = { name: item, price: actPrice, qty: 1 };

    //look for item in cart array
    let existingItem = cartCopy.find((cartItem) => cartItem.name == name);

    if(!resN) {
      localStorage.setItem("resName", resName);
    }
    //if item already exists
    if (existingItem) {
      existingItem.qty = existingItem.qty + 1; //update item
    } else {
      //if item doesn't exist, simply add it
      cartCopy.push(order);
    }

    //update app state
    setCart(cartCopy);

    //make cart a string and store in local space
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
    alert("Added " + name + " to cart successfully!");
  };
  console.log(reviewData);
  console.log(bestSell);

  return (
    <>
      <Navbar />
      <section className="menu">
        <div className="my-auto justify-content-between align-items-center">
          <h3 className="restaurant-title text-start fs-4 fw-bold px-lg-5 py-lg-5">
            {resName}
          </h3>
          <div className="menu-left px-lg-5 py-ly-5 pt-0 d-flex">
            <i className="bi bi-pin-map-fill pe-3"></i>
            <p>{resAdd}</p>
          </div>
        </div>
        <div className="pt-5 px-lg-5 py-sm-0">
          <div className="row g-5">
            <div className="col-lg-3 col-md-3 col-12">
              <div className="food_options tab-col-1 rounded-3 pb-2 card">
                <h3 className="fs-5 fw-bold px-3 pt-4 pb-2 text-start">
                  All Details
                </h3>
                <div className="">
                  <div
                    className="nav flex-column nav-pills me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className="nav_button nav-link active fw-bold fs-6 my-1 text-start ms-3"
                      id="v-pills-menu-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-menu"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-menu"
                      aria-selected="true"
                    >
                      Menu
                    </button>
                    <button
                      className="nav_button nav-link  fw-bold fs-6 my-1 text-start ms-3"
                      id="v-pills-best-product"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-messages"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                      onClick={(e) => getBestSelling(e)}
                    >
                      Best Selling
                    </button>

                    <button
                      className="nav_button nav-link  fw-bold fs-6 my-1 text-start ms-3"
                      id="v-pills-reviews-tabs"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-reviews"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-reviews"
                      aria-selected="false"
                      onClick={(e) => getReviews(e)}
                    >
                      Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-6 col-12 tab-col-1 mx-auto">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-menu"
                  role="tabpanel"
                  aria-labelledby="v-pills-menu-tab"
                  tabindex="0"
                >
                  <div className="food_menu card p-4 mb-5">
                    <h1 className="fs-5 fw-bold pt-1 pb-1 mb-4 text-start">
                      Menu Items
                    </h1>

                    {data.map((data) => (
                      <div className="food_menu_item">
                        <div className="d-flex justify-content-between item-info mb-5">
                          <div>
                            <img
                              src={data.menuImage}
                              alt="image"
                              className="img-fluid rounded prod-img"
                            />
                          </div>
                          <div className="food_info text-start">
                            <h3 className="3fs-6 fw-bold">{data.menuName}</h3>
                            <p className="m-0 fw-lighter">
                              {data.menuDescription}
                            </p>
                            <h3 className="fs-5 pt-1">
                              <span className="price">{data.menuPrice}</span>
                            </h3>
                          </div>
                          <div>
                            <button
                              className="custom--btn"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasRight"
                              aria-controls="offcanvasRight"
                              onClick={() => {
                                addItem(data.menuName, data.menuPrice);
                              }}
                            >
                              Order
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-best-product"
                  tabindex="0"
                >
                  <div className="food_menu card p-4 mb-5">
                    <h1 className="fs-5 fw-bold pt-1 pb-1 mb-4 text-start">
                      Best Sellings
                    </h1>
                    <div className="food_menu_item">
                      {bestSell.map((data) => (
                        <div className="d-flex justify-content-between item-info mb-5">
                          <div>
                            <img
                              src={data.menuImage}
                              alt="image"
                              className="img-fluid rounded prod-img"
                            />
                          </div>
                          <div className="food_info px-3 text-start">
                            <h3 className="3fs-6 fw-bold">{data.menuName}</h3>
                            <p className="m-0 fw-lighter">
                              {data.menuDescription}
                            </p>
                            <h3 className="fs-5 pt-1">
                              <span className="price">{data.menuPrice}</span>
                            </h3>
                          </div>
                          <div>
                            <button
                              className="custom--btn"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasRight"
                              aria-controls="offcanvasRight"
                            >
                              Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-reviews"
                  role="tabpanel"
                  aria-labelledby="v-pills-reviews-tabs"
                  tabindex="0"
                >
                  <div>
                    <div className="food_menu card px-4 mb-5">
                      <h3 className="fs-5 fw-bold pt-4 mb-4 text-start">
                        Reviews
                      </h3>
                      <div>
                        {reviewData.map((data) => (
                          <div className="d-flex pb-5">
                            <div className="pe-3">
                              <img
                                src="./images/user.jpeg"
                                className="rounded-circle review_image"
                                width="140"
                                height="100"
                                alt="user image"
                              />
                            </div>
                            <div>
                              <div className="d-flex justify-content-between text-start">
                                <div>
                                  <h3 className="fs-6 fw-bold ">{data.reviewName}</h3>
                                </div>
                              </div>
                              <p className="m-0 fw-lighter text-start">
                                {data.reviewDescription}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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

export default Menu;
