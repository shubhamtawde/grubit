import React from "react";
import "./main.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import RestaurantCard from "../../Components/Card/RestaurantCard";
import ClubBookingCard from "../../Components/Card/ClubBookingCard";
import { useCookies } from "react-cookie";
import $ from 'jquery';

function Home() {
  const [cookies, setCookie] = useCookies(["Token"]);
  $(document).ready(function () {
    $(".testimonial .indicators li").click(function () {
      var i = $(this).index();
      var targetElement = $(".testimonial .tabs li");
      targetElement.eq(i).addClass("active");
      targetElement.not(targetElement[i]).removeClass("active");
    });
    $(".testimonial .tabs li").on("click", function () {
      var targetElement = $(".testimonial .tabs li");
      targetElement.addClass("active");
      targetElement.not($(this)).removeClass("active");
    });
  });
  $(document).ready(function () {
    $(".slider .swiper-pagination span").each(function (i) {
      $(this)
        .text(i + 1)
        .prepend("0");
    });
  });
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "0px" }}></div>
      <section id="hero" class="hero d-flex align-items-center section-bg">
        <div class="container">
          <div className="row justify-content-between gy-5">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <div className="wrapper">
                <ul className="dynamic-txts">
                  <li>
                    <span>Eat Fresh.</span>
                  </li>
                  <li>
                    <span>Eat Delicious.</span>
                  </li>
                  <li>
                    <span>Grub it Fast.</span>
                  </li>
                </ul>
              </div>
              <h4>Discover your healthy delicious meals daily!</h4>

              <div className="d-flex">
                <a href="#book-a-table" className="btn-book-a-table">
                  Book a Table
                </a>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
              <img
                src="https://bootstrapmade.com/demo/templates/Yummy/assets/img/hero-img.png"
                className="hero-image img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <div id="section01" className="choose-us">
        <div className="section-title mt-5 mb-0">
          <h2 className="mb-0">Why Choose Us</h2>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card border-0">
              <div className="image_icon">
                <img
                  src="./images/step1.png"
                  className="card-img-top"
                  alt="delivery"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Free & Fast Delivery</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0">
              <div className="image_icon">
                <img
                  src="./images/step2.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Best Food Quality</h5>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0">
              <div className="image_icon">
                <img
                  src="./images/step3.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Easy to Order</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RestaurantCard />
      <section className="offer-area mt-5 pt-5">
        <div className="section-title mt-5 mb-0">
          <h2 className="mb-0">Offers</h2>
        </div>
        <div className="container-fluid px-5">
          <div className="row ">
            <div className="offers col-xl-4 col-lg-3 col-md-6 d-flex justify-content-center">
              <div className="single-offer-wrap single-offer-wrap-3">
                <img
                  className="bg-img"
                  src="./images/index_card1.png"
                  alt="img"
                />
                <div className="wrap-details">
                  <h3>Enjoy 30% CashBack</h3>
                </div>
              </div>
            </div>
            <div className="offers col-xl-4 col-lg-3 col-md-6 d-flex justify-content-center">
              <div className="single-offer-wrap single-offer-wrap-4">
                <img
                  className="bg-img"
                  src="./images/index_card2.png"
                  alt="img"
                />
                <div className="wrap-details text-center">
                  <h3 style={{ color: "black" }}>
                    <span>25% EXTRA</span> &nbsp; ON FRIES
                  </h3>
                </div>
              </div>
            </div>
            <div className="offers col-xl-4 col-lg-3 col-md-6 d-flex justify-content-center">
              <div className="single-offer-wrap single-offer-wrap-5">
                <img
                  className="bg-img"
                  src="./images/index_img3.png"
                  alt="img"
                />
                <div className="wrap-details">
                  <h5>Test with</h5>
                  <h3>
                    <span>JAPANESE</span> FOOD AT HOME
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClubBookingCard />
      <section className="testimonial">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block">
              <ol className="carousel-indicators tabs">
                <li
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                >
                  <figure>
                    <img
                      src="https://livedemo00.template-help.com/wt_62267_v8/prod-20823-one-service/images/testimonials-01-179x179.png"
                      className="img-fluid"
                      alt=""
                    />
                  </figure>
                </li>
                <li
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                >
                  <figure>
                    <img
                      src="https://livedemo00.template-help.com/wt_62267_v8/prod-20823-one-service/images/testimonials-02-306x306.png"
                      className="img-fluid"
                      alt=""
                    />
                  </figure>
                </li>
                <li
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                >
                  <figure>
                    <img
                      src="https://livedemo00.template-help.com/wt_62267_v8/prod-20823-one-service/images/testimonials-03-179x179.png"
                      className="img-fluid"
                      alt=""
                    />
                  </figure>
                </li>
              </ol>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <div
                id="carouselExampleIndicators"
                data-bs-interval="false"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <h3 className="text-start mx-lg-5">WHAT OUR CLIENTS SAY</h3>
                <h1 className="text-start mx-lg-5">TESTIMONIALS</h1>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="quote-wrapper text-start">
                      <p>
                        I have tried a lot of food delivery services but Plate
                        is something out of this world! Their food is really
                        healthy and it tastes great, which is why I recommend
                        this company to all my friends!
                      </p>
                      <h3>Lindsay Harrop</h3>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="quote-wrapper text-start">
                      <p>
                        Good quality, and a nice variety of menu items
                        available. I love that I can communicate what
                        ingredients i need left out. I love this service!
                      </p>
                      <h3>Amanda Webb</h3>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="quote-wrapper text-start">
                      <p>
                        I’m a business owner who lives a very hectic life, but
                        I’m invested in my health and work out 6 times a week.
                        This service ensures I don’t miss meals and puts
                        extremely healthy food into my system.
                      </p>
                      <h3>Peter Lee</h3>
                    </div>
                  </div>
                </div>
                <ol className="carousel-indicators indicators">
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                  ></li>
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                  ></li>
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                  ></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="faq">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
          </div>

          <ul className="faq-list accordion mt-3" data-aos="fade-up">
            <li>
              <a
                data-bs-toggle="collapse"
                className="collapsed"
                data-bs-target="#faq1"
              >
                Is this GrubIt's new website?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </a>
              <div id="faq1" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Sort of. It’s an upgraded version of the GrubIt you are used
                  to.So, while the core functionality is all same but with new
                  features.
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
                className="collapsed"
              >
                What happened to the old site?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </a>
              <div id="faq2" className="collapse" data-bs-parent=".faq-list">
                <p>Uh… we replaced it with the new one</p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
                className="collapsed"
              >
                Is the new Grubhub better? Or does it just look better?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </a>
              <div id="faq3" className="collapse" data-bs-parent=".faq-list">
                <p>
                  We’re upgrading plenty of things, and more features are coming
                  soon.And, hey, thanks for saying it looks better. We thought
                  so, too.
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
                className="collapsed"
              >
                Something is wrong with my food. What do I do?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </a>
              <div id="faq4" className="collapse" data-bs-parent=".faq-list">
                <p>
                  f there’s a problem with your order, please call the
                  restaurant and let them know.
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq5"
                className="collapsed"
              >
                Is there a minimum amount I have to spend to order?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </a>
              <div id="faq5" className="collapse" data-bs-parent=".faq-list">
                <p>
                  In some cases, yes. Restaurants often require a minimum order
                  size to deliver an order.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
