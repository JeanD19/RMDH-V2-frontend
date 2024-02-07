import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import '../App.css';
import Navbar from "../Navbar";
import lookup from "../imgs/lookup.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const Profile = () => {
    const { user } = useContext(UserContext); // Get the user from the context
    const navigate = useNavigate();
    //console.log(user);

    useEffect(() => {
        if (!user) {
            //console.log("User is not logged in")
            navigate("/");
        }
    }, [user]);
    
    return(
        <div className="scrollable-component">
            <Navbar/>
            <div className="container row ms-1 mt-5">
                <div className="col-6">
                    <h1 className="mb-3">Profile</h1>
                    <div className="row">
                        <div className="col-auto">
                            <h4 className="mt-1 mb-0">Username:</h4>
                        </div>
                        <div className="col-auto">
                            <p className="fs-4 fw-lighter mb-0">{ user && user.username}</p>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-auto">
                            <h4 className="mt-1 mb-0">University:</h4>
                        </div>
                        <div className="col-auto">
                            <p className="fs-4 fw-lighter mb-0">{user && user.university}</p>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-auto">
                            <h4 className="mt-1 mb-0">Year:</h4>
                        </div>
                        <div className="col-auto">
                            <p className="fs-4 fw-lighter mb-0">{user && user.year}</p>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-auto">
                            <h4 className="mt-1 mb-0">Email:</h4>
                        </div>
                        <div className="col-auto">
                            <p className="fs-4 fw-lighter mb-0">{user && user.email}</p>
                        </div>
                    </div>
                </div>    
            </div>

        </div>
        
    )
}

export default Profile;