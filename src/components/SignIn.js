import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import '../App.css';
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-toastify/dist/ReactToastify.css';
import userService from "../services/user-service";
import SchoolDataService from "../services/school-service";


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [university, setUniversity] = useState('');
    const [year, setYear] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

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

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    //These will be used on the form to select the university and year
    const [universities, setUniversities] = useState([]); // State to store the universities

    useEffect(() => {
        const getAllSchools = () => {
            SchoolDataService.getAll()
            .then(response => {
                console.log(response.data);
                const schools = response.data.schools;
                const universityNames = schools.map(school => school.name);
                setUniversities(universityNames);
                console.log(universities);
            })
            .catch(e => {
                console.log(e);
            });
        };

        getAllSchools();
    }, []);

    

    const handleSchoolChange = (e) => {
        setUniversity(e.target.value);
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // These are for the log in form

    const [emailLogIn, setEmailLogIn] = useState('');
    const [passwordLogIn, setPasswordLogIn] = useState('');

    const handleEmailLogInChange = (e) => {
        setEmailLogIn(e.target.value);
    };

    const handlePasswordLogInChange = (e) => {
        setPasswordLogIn(e.target.value);
    };

    const handleSubmitLogIn = (e) => {
        e.preventDefault();
        console.log('Email: ' + emailLogIn);
        console.log('Password: ' + passwordLogIn);

        const data = {  
            email: emailLogIn,
            password: passwordLogIn
        };

        userService.logIn(data).then(response => {
            setShowToast(true);
            toast.success('Log in success!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            //Redirect to the home page
            const auth_user = response.data.user;
            setUser(auth_user);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }).catch(error => {
            setShowToast(true);
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        });
    };

    const handleSubmitSignUp = (e) => {
        e.preventDefault();

        if(university === '' || university === 'Select your university/college') {
            setShowToast(true);
            toast.error('Please select a university', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if(year === '' || year === 'Select Year') {
            setShowToast(true);
            toast.error('Please select a year', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const cleanPassword = password.replace(/\s/g, '');
        if(cleanPassword.length < 6) {
            setShowToast(true);
            toast.error('Password must be at least 6 characters long', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const data = {
            university: university,
            year: year,
            email: email,
            password: cleanPassword
        }
        userService.createUser(data).then(response => {
            setShowToast(true);
            toast.success('User created successfully', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            //Redirect to the home page
            const auth_user = response.data.user;
            setUser(auth_user);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }).catch(error => {
            setShowToast(true);
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        });
    };

    return (
        <div className="scrollable-component">
            <Navbar/>
            <div className="container row mt-5 ms-1 justify-content-between">
                <div className="col-lg-5">
                    <form onSubmit={handleSubmitSignUp}>
                        <h1 className="mb-3">Sign Up</h1>
                        <div className="mb-2">
                            <label htmlFor="selectUni" className="form-label">School</label>
                            <select id="selectUni" className="form-select" aria-label="select-school" aria-describedby="selectSchool" onChange={handleSchoolChange} defaultValue="Select your university/college">
                                <option value="Select your university/college">Select your university/college</option>
                                {
                                    universities.map((university) => {
                                        return (
                                            <option value={university} key={university}>{university}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="selectYear" className="form-label">Year</label>
                            <select id="selectYear" className="form-select" aria-label="select-year" aria-describedby="selectYear" onChange={handleYearChange} defaultValue={"Select Year"}>
                                <option value="Select Year">Select Year</option>
                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                                <option value="Graduate Student">Graduate Student</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailChange} required/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePasswordChange} required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-lg-5">
                    <h1 className={windowSize.width <= 1000 ? 'mt-4' : null}>Login In</h1>
                    <form onSubmit={handleSubmitLogIn}>
                        <div className="mb-2">
                            <label htmlFor="exampleInputEmailLogIn" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmailLogIn" aria-describedby="emailHelp" onChange={handleEmailLogInChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPasswordLogIn" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPasswordLogIn" onChange={handlePasswordLogInChange} required/>
                        </div>
                        <button type="submit" className="btn btn-dark">Log in</button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default SignIn;
