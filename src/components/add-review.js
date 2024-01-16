import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { UserContext } from '../UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import ReviewDataService from "../services/review-service";

const AddReview = props => {
    const location = useLocation();
    const [diningHall, setDining_halls] = useState(location.state.dining_hall);
    const { user } = useContext(UserContext);

    //const [username, setUsername] = useState("");
    const [year, setYear] = useState("");
    const [text_review, setText_review] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [ratings, setRatings] = useState({
        taste: '--',
        atmosphere: '--',
        location: '--',
        service: '--',
        cleanliness: '--',
        menu: '--',
        price: '--'
    });
    const navigate = useNavigate();

    useEffect(() => {
        setYear(user ? user.year : "Select Year");
    }, [user])

    const handleYearChange = (e) => {
        setYear(e.target.value);
    }

    const handleTextChange = (e) => {
        setText_review(e.target.value);
    }

    const handleRatingChange = (category) => (event) => {
        setRatings(prevRatings => ({
          ...prevRatings,
          [category]: event.target.value
        }));
      };

    // Submittion of a review
    const handleSubmitReview = (e) => {
        e.preventDefault()

        //Checking if any of the ratings are not selected
        if (Object.values(ratings).includes('--')) {
            setShowToast(true);
            toast.error('All ratings must be selected.', {
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
        else if(year === '' || year === 'Select Year') {
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
        else {
            // Call the service for reviews and submit it
            const data = {
                username: user,
                dining_id: diningHall._id,
                year: year,
                text_review: text_review,
                grades: ratings
            }

            
            ReviewDataService.addReview(data).then(response => {
                setShowToast(true);
                toast.success('Submit successful', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Redirect to the dining hall
                setTimeout(() => {
                    navigate(`/dining-hall/${diningHall._id}`, {state: {
                        dining_hall: diningHall
                    }});
                }, 3000);

            }).catch(e => {
                console.log('Error');
            })
            
        }
    };


    return(
        <div className="scrollable-component">
            <Navbar/>
            <div className="container-fluid row">
                <div className="col-sm-5">
                    <form onSubmit={handleSubmitReview}>
                        <h2 className="mb-3 mt-4"><b className="text-warning">*</b>REVIEW {diningHall.name}</h2>
                        <div className="mb-2">
                            <label htmlFor="selectYear" className="form-label">Year</label>
                            <select id="selectYear" className="form-select w-75" aria-label="select-year" aria-describedby="selectYear" onChange={handleYearChange} defaultValue={user ? user.year : 'Select Year'} disabled={user ? true : false}>
                                <option value="Select Year">Select Year</option>
                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                                <option value="Graduate Student">Graduate Student</option>
                            </select>
                        </div>
                        <div>
                            <h4 className="mb-3 mt-4">GRADING</h4>
                            <div className="mb-3">
                                <label htmlFor="selectTaste" className="form-label">Taste</label>
                                <select id="selectTaste" className="form-select w-25" aria-label="select-taste" aria-describedby="selectTaste" value={ratings.taste} onChange={handleRatingChange('taste')}>
                                    <option value="--">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectAtmosphere" className="form-label">Atmosphere</label>
                                <select id="selectAtmosphere" className="form-select w-25" aria-label="select-atmosphere" aria-describedby="selectAtmosphere" value={ratings.atmosphere} onChange={handleRatingChange('atmosphere')}>
                                    <option value="--">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectLocation" className="form-label">Location</label>
                                <select id="selectLocation" className="form-select w-25" aria-label="select-location" aria-describedby="selectLocation" value={ratings.location} onChange={handleRatingChange('location')}>
                                    <option value="--">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectService" className="form-label">Service</label>
                                <select id="selectService" className="form-select w-25" aria-label="select-service" aria-describedby="selectService" value={ratings.service} onChange={handleRatingChange('service')}>
                                    <option value="--">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectCleanliness" className="form-label">Cleanliness</label>
                                <select id="selectCleanliness" className="form-select w-25" aria-label="select-cleanliness" aria-describedby="selectCleanliness" value={ratings.cleanliness} onChange={handleRatingChange('cleanliness')}>
                                    <option value="--">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectMenu" className="form-label">Menu</label>
                                <select id="selectMenu" className="form-select w-25" aria-label="select-menu" aria-describedby="selectMenu" value={ratings.menu} onChange={handleRatingChange('menu')}>
                                    <option value="--">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectPrice" className="form-label">Price</label>
                                <select id="selectPrice" className="form-select w-25" aria-label="select-price" aria-describedby="selectPrice" value={ratings.price} onChange={handleRatingChange('price')}>
                                    <option value="--">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            
                        </div>
                        <div className="mb-3">
                            <h4 className="mb-3 mt-4">FEEDBACK</h4>
                            <label htmlFor="textReview" className="form-label">Written Review</label>
                            <textarea className="form-control" id="textReview" onChange={handleTextChange} aria-describedby="textReviewHelp" placeholder="Please write any thoughts or feedback here..." style={{ height: '150px', width: '400px'}} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AddReview;