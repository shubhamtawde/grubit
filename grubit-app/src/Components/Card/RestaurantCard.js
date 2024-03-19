import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./card.css";

function RestaurantCard() {
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies(["Token"]);
  const URL = "http://localhost:8080/api/fetchRestaurant";
  let ignore = false;

  useEffect(() => {
    console.log(ignore);
    if (!ignore) {
      if (cookies.Token == null) {
        console.log("Cookies not there");
      } else {
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
            setData(json.data);
          });
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="restaurants mb-5">
      <div class="section-title mt-5 mb-0">
        <h2 class="mb-0">Popular Restaurants</h2>
      </div>
      <div className="container">
        <div className="row gy-5">
          {data.map((data) => (
            <div className="col-xl-3 col-lg-4 col-md-6 px-4 d-flex justify-content-center">
              <Link
                to={"/menu"}
                state={{
                  id: data.restaurantID,
                  name: data.restaurantName,
                  add: data.restaurantAddress,
                }}
              >
                <div className="card">
                  <img
                    src={data.restaurantImage}
                    className="card-img-top"
                    alt="Card01"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.restaurantName}</h5>
                    <p className="card-text">{data.restaurantAddress}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RestaurantCard;
