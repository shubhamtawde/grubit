import React from 'react'
import { Link } from 'react-router-dom';
import './footer.css'

function Footer() {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-3 col-md-6 footer-info text-start">
                            <h3>GrubIt</h3>
                            <p>GrubIt is food Ordering Web Application.It provide various restaurants options providing
                                delivery options as well as online table booking. </p>
                            <div className="social-links mt-5">
                                <Link to='/https://www.twitter.com' className="twitter">
                                    <i className="bi bi-twitter"></i>
                                </Link>

                                <Link to="/https://www.facebook.com" className="facebook">
                                    <i className="bi bi-facebook"></i>
                                </Link>
                                <Link to="/https://www.instagram.com" className="instagram">
                                    <i className="bi bi-instagram"></i>
                                </Link>
                                <Link to="/https://www.whatsapp.com" className="whatsapp">
                                    <i className="bi bi-whatsapp"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6 footer-links text-start">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><i className="bi bi-chevron-double-right"></i><a href="#">Home</a></li>
                                <li><i className="bi bi-chevron-double-right"></i><a href="#">About us</a></li>
                                <li><i className="bi bi-chevron-double-right"></i><a href="#">Pricing</a></li>
                                <li><i className="bi bi-chevron-double-right"></i><a href="#">Menu</a></li>
                                <li><i className="bi bi-chevron-double-right"></i><a href="#">Contact Us</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-contact text-start">
                            <h4>Get in Touch</h4>
                            <ul>
                                <li><i className="bi bi-geo-alt-fill"></i>A108 Adam Street <br />
                                    New York, NY 535022<br />
                                    United States <br /></li>
                                <li><i className="bi bi-telephone"></i><strong>Phone:</strong> +1 (558)-554-5588<br /></li>
                                <li><i className="bi bi-envelope"></i><strong>Email:</strong> info@example.com<br /></li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-6 footer-newsletter text-start">
                            <h4>Subscribe</h4>
                            <p>Subscribe Now to get latest deals and offers! Get upto 50% off your next order when you
                                subscribe!</p>
                            <form action="" method="post" className="d-flex">
                                <input type="email" className="form-control" name="email" />
                                <button type="submit"  className='subscribe'>Subscribe</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="copyright">
                    &copy; Copyright 2022 <strong><span>GrubIt</span></strong>. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer