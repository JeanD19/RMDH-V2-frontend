import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import facebook from "../imgs/facebook.png";
import instagram from "../imgs/instagram.png";
import twitter from "../imgs/twitter.png";
import tiktok from "../imgs/tiktok.png";
import snapchat from "../imgs/snapchat.png";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import ReviewDataService from "../services/review-service";

const DiningHall = props => {
    const location = useLocation();
    const empty_sub_ratings = {
        taste: 0,
        atmosphere: 0,
        location: 0,
        service: 0,
        cleanliness: 0,
        menu: 0,
        price: 0
    }
    const [diningHall, setDining_halls] = useState(location.state.dining_hall);
    const [reviews, setReviews] = useState([]); // State to store all the reviews associated with the dining hall
    const [numerical_rating, setNumericalRating] = useState(0);
    const [subRatings, setSubRatings] = useState(empty_sub_ratings);
    
    let color;

    if(numerical_rating <= 3.3){
        color = 'bg-danger';
    }
    else if(numerical_rating > 3.3 && numerical_rating <= 6.6){
        color = 'bg-warning';
    }
    else{
        color = 'bg-success';
    }

    const getReviews = diningHall => {
        ReviewDataService.getReviews(diningHall._id).then(response => {
            setReviews(response.data.reviews);
        }).catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        getReviews(diningHall);
        if (diningHall.total_reviews > 0) {
            setNumericalRating((diningHall.reviews_sum.$numberDecimal / diningHall.total_reviews).toFixed(1));
            const newSubRatings = Object.keys(diningHall.sub_ratings).reduce((acc, key) => {
                acc[key] = (diningHall.sub_ratings[key] / diningHall.total_reviews).toFixed(1);
                return acc;
            }, {});
            setSubRatings(newSubRatings);
        } else {
            setNumericalRating('0.0');
            setSubRatings(empty_sub_ratings);
        }
    }, [diningHall]);

    return(
        <div className="scrollable-component">
            <Navbar/>
            <div style={{ width: '100%', height: '470px', backgroundImage: `url(${diningHall.images[1]})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-sm-6 p-3">
                        <h6><b style={{marginRight: '0.5em'}}>NAME:</b><span className="fw-light">{diningHall.name}</span>
                        </h6>
                        <h6><b style={{marginRight: '0.5em'}}>ADDRESS:</b><span className="fw-light">{diningHall.address}</span></h6>
                        <h6><b style={{marginRight: '0.5em'}}>RATING:</b>
                        <span className={color}>{numerical_rating}</span></h6>
                        <h6><b style={{marginRight: '0.5em'}}>WEBSITE:</b><span className="fw-light"><a className="text-decoration-none" href={diningHall.website_url}>{diningHall.website_url}</a></span></h6>
                        <div className="row ">
                            {
                                Object.keys(diningHall.social_media).map((key, index) => {
                                    let social_media_image = key;
                                    let social_media_link = diningHall.social_media[key];

                                    if(social_media_image === "facebook"){
                                        social_media_image = facebook;
                                    } else if(social_media_image === "instagram"){
                                        social_media_image = instagram;
                                    } else if(social_media_image === "twitter"){
                                        social_media_image = twitter;
                                    } else if(social_media_image === "tiktok"){
                                        social_media_image = tiktok;
                                    } else if(social_media_image === "snapchat"){
                                        social_media_image = snapchat;
                                    } else {
                                        social_media_image = null;
                                    }

                                    return(
                                        <div className="col-auto px-1" key={index}>
                                            <a href={social_media_link}><img src={social_media_image} alt="Social media Logo"/></a>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <h3 className="mb-4 mt-5"><b className="text-danger">*</b>GALLERY</h3>
                    <div className="row">
                        <div className="col-md-8">
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    {diningHall.images.map((image, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={image}  style={{objectFit: 'cover', width: '100%', height: '100%'}} alt="..." />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-5">
                    <h3 className="mb-4 mt-5"><b className="text-success">*</b>AMENITIES</h3>
                    <div className="row ms-3">
                        <ul>
                            <div className="col-md-8">
                            {
                                diningHall.amenities.map((amenity, index) => {
                                    return(
                                        <li key={index}>{amenity}</li>
                                    )
                                })
                            }
                            </div>
                        </ul>
                        
                    </div>    
                </div>
                <div className="row mt-2 mb-3">
                    <h3 className="mb-4 mt-3"><b className="text-primary">*</b>GRADE BOOK</h3>
                    <div className="row justify-content-start">
                        <div className="col-auto">
                            {
                                Object.keys(subRatings).map((key) => (
                                    <h6 key={key}>
                                        <b style={{marginRight: '0.5em'}}>{key.toUpperCase()}</b>
                                        <span className="fw-light fs-3 fst-italic">
                                            {
                                                subRatings[key] || '0.0'
                                            }/10
                                        </span>
                                    </h6>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-3">
                    <h3 className="mb-4 mt-5"><b className="text-warning">*</b>REVIEWS</h3>
                    <div className="row">
                        <div className="col-lg-6">
                            
                            {
                                reviews.length !== 0 ? (
                                    reviews.map((review) => {
                                        const id = review._id;
                                        const username = review.username;
                                        const year_in_school = review.year;
                                        const date = review.date; //needs to be formatted to mm/dd/yyy
                                        const grades = review.ratings;
                                        const comments = review.text_review;
                                        //console.log(grades);
                                        
                                        const sum = Object.values(grades).reduce((a, b) => a + b, 0);
                                        //console.log(sum)
                                        // const sum = gradesValues.reduce((a, b) => a + b, 0);
                                        // console.log(`The sum ${sum}`)
                                        const length = Object.keys(grades).length;
                                        const average = (sum / length).toFixed(1);
                                        

                                        let color_review_rating;

                                        if (average <= 3.3) {
                                            color_review_rating = 'bg-danger';
                                        } else if (average > 3.3 && average <= 6.6) {
                                            color_review_rating = 'bg-warning';
                                        } else {
                                            color_review_rating = 'bg-success';
                                        }
                                        //console.log(average);

                                        const options = {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour12: true,
                                        };

                                        const mongoDate = new Date(date)

                                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(mongoDate);
                                        //console.log(formattedDate)

                                        return (
                                            <div className="card mt-3" key={id}>
                                                <div className="card-body">
                                                    <h6 className="card-subtitle mb-2 text-muted">__{formattedDate}</h6>
                                                    <h5 className="card-title">{username} ({year_in_school})</h5>
                                                    <p className="card-text"> <b>GRADE: </b> <span className={color_review_rating}>{average}</span></p>
                                                    <p className="card-text">{comments}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p className="ps-3">No reviews yet...</p>
                                )
                            }

                        </div>
                    </div>
                    <Link to={"/dining-hall/" + diningHall._id + "/review"} state={{dining_hall: diningHall}} className="text-white text-decoration-none ms-4 mt-3">
                        <button type="button" className="btn btn-primary btn-lg mb-3" style={{ width: '15em'}}>
                        LEAVE A REVIEW
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DiningHall;