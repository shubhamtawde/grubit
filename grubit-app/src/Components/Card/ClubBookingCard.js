import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./card.css";

const clubBookingCard = [
  {
    clubImage: "./images/Club-1.jpeg",
    clubName: "The Grand",
    clubAddress: "58 Seaport Blvd. Boston 02210",

  },
  {
    clubImage: "./images/Club-2.jpeg",
    clubName: "Club Café",
    clubAddress: "209 Columbus Avenue Boston",
  },
  {
    clubImage: "./images/Club-3.jpeg",
    clubName: "Encore Boston Harbor",
    clubAddress: "1 Broadway Everett 02149",
  },
  {
    clubImage: "./images/Club-4.jpeg",
    clubName: "Royale",
    clubAddress: "279 Tremont St Boston 02116",
  },
  {
    clubImage: "./images/Club-5.jpeg",
    clubName: "Big Night Live",
    clubAddress: "110 Causeway St Boston 02114",
  },
  {
    clubImage: "./images/Club-6.jpeg",
    clubName: "The Beehive",
    clubAddress: "541 Tremont St Boston 02116",
  },
  {
    clubImage: "./images/Club-7.jpeg",
    clubName: "Venus",
    clubAddress: "100 Warrenton St Boston 02116",
  },
  {
    clubImage: "./images/Club-8.jpeg",
    clubName: "Hava",
    clubAddress: "246 Tremont St Boston 02116",
  },
];

function ClubBookingCard() {
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies(['Token']);
  const URL = "http://localhost:8080/api/fetchClubs";
  let ignore = false;

  useEffect(() => {
    console.log(ignore);
    if (!ignore) {
      if (cookies.Token == null) {
        console.log("Cookies not there");
      }
      else {
        fetch(URL, {
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
            console.log(json.data);
            setData(json.data);
          })
      }
    }

    return () => { ignore = true; }
  }, [])




  return (
    <section className="restaurants mb-5">
      <div className="club-title mt-5 mb-1 p-sm-5">
        <h2 className="mb-0">City Night Clubs</h2>
      </div>
      <div className="container">
        <div className="row gy-5 ">
          {data.map((data) => (
            <div className="col-xl-3 col-lg-4 col-md-6 px-4 d-flex justify-content-center">
              <Link to={'/booking'}>
                <div className="card">
                  <img
                    src={data.clubImage}
                    className="card-img-top"
                    alt="Card01"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.clubName}</h5>
                    <p className="card-text">{data.clubAddress}</p>
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

export default ClubBookingCard;

