import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import '../App.css';
import Navbar from "../Navbar";
import lookup from "../imgs/lookup.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import founder from "../imgs/founder_ceo.png";
import linkedin from "../imgs/linkedin.png";


const AboutUs = () => {
    return(
        <div className="scrollable-component">
            <Navbar/>
            <div className="container-fluid mt-5">
                <h1>Who are we?</h1>
                <p>We are the first platform enabling university students to review their dining hall experience. We take a holistic approach by focusing on all aspects of a dining hall including price, food quality, location, service, taste, etc. We aim for current and prospective students to use our platform to view and review the performance of dining halls' performance freely.</p>

                <h2>Our team</h2>
                <div className="row mt-3 mb-5">
                    <div className="col-sm-5">
                        <div className="card">
                            <img className="card-image-top" src={founder}/>
                            <div className="card-body">
                                <h5 className="card-title">Jean-Daniel</h5>
                                <p className="card-text">Founder & CEO <a href="https://www.linkedin.com/in/jean-daniel-liwanga/"><img src={linkedin} alt="LinkedIn link"/></a></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AboutUs;