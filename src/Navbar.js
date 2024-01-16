import React, { useState, useEffect, useContext } from "react";
import logo from "./imgs/RMDHLogo.png";
import lookup from "./imgs/lookup.png";
import menu from "./imgs/hamburgerMenu.png";
import user_icon from "./imgs/user_icon_48.png";
import user_icon_small from "./imgs/user_icon_24.png";
import { UserContext } from './UserContext';
import userService from "./services/user-service";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const [school_name, setSchoolName] = useState(""); // State to store the school name entered in the input

    const handleSchoolChange = e => {
        const school_name = e.target.value;
        setSchoolName(school_name);
    }
    const navigate = useNavigate();
    const location = useLocation();
    let display_search = false;

    if(location.pathname !== "/"){
        display_search = true;
    }

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleSignOut = () => {

        // Delete/Remove the session from the backend
        userService.signOut().then(response => {
            console.log(response.data);
            setTimeout(() => {
                navigate("/");
            }, 1000);
            setUser(null);    
        }).catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount


    return(
        <nav className="navbar bg-black">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="logo" className="logo img-fluid"/>
                </a>
                <div className="d-flex flex-row-reverse">
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <img src={menu} className="menu img-fluid"/>
                    </button>
                    {
                        user ? (
                            <div>
                                <Link to="/profile" className="nav-link text-decorations-none">
                                    <button className="btn">
                                        {windowSize.width > 500 ? (
                                            <img src={user_icon} className="img-fluid p-0" alt="User icon medium to large"/>
                                            
                                        ) : (
                                            <img src={user_icon_small} className="img-fluid p-0" alt="User icon small"/>
                                        )}    
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to="/sign-in" className="nav-link text-decorations-none text-dark">
                                    <button className="btn btn-secondary mt-1">Sign In</button>
                                </Link>
                            </div>
                        )
                    }
                    {
                        display_search ? (
                            <div className="d-flex">
                                <input type="text" className="form-control mx-2 mt-2 input-search-nav-sm" aria-label="Search by school" placeholder="Search by school" onChange={handleSchoolChange} style={{ height: '30px'}}/>
                                <Link to={"/school-search/" + school_name} className="nav-link text-decorations-none text-dark">
                                    <img src={lookup} className="img-fluid mt-2 me-3" alt="Look up glass"/>
                                </Link>
                            </div>
                        ) : (
                            null
                        )
                    }
                </div>
                
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h2 id="offcanvasRightLabel">Menu</h2>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"/>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link to="/about-us" className="nav-link text-decorations-none text-dark">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/social-media" className="nav-link text-decorations-none text-dark">Social Media</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/give-feedback" className="nav-link text-decorations-none text-dark">Feedback</Link>
                            </li>
                            {
                                user ? (
                                    <li className="nav-item">
                                        <button className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
                                    </li>
                                ) : (
                                    null
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;