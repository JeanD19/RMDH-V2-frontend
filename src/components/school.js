import React, { useState, useEffect } from "react";
import DiningDataService from "../services/dining-service";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const School = props => {
    const location = useLocation();
    const [school, setSchool] = useState(location.state.school);
    const [dining_halls, setDining_halls] = useState([]); // State to store the dining halls that match search term


    //Method to get the dining halls
    const getDiningHalls = school => {
        DiningDataService.getDinings(school._id)
        .then(response => {
            setDining_halls(response.data.dining_halls);
            console.log(response.data.dining_halls);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {getDiningHalls(school)}, [school]);

    return(
        <div className="scrollable-component">
            <Navbar/>
            <div className="container-fluid mt-5 ms-1">
                <div className="row justify-content-start">
                    <div className="col-md-3 pe-0">
                        <img src={school.logo} className="img-fluid uniform-image"/>
                        <div className="mt-3">
                            <h5 >{school.name}</h5>
                            <p>{school.address}</p> 
                        </div>      
                    </div>
                    <div className="col-lg-9 ">
                        {
                            dining_halls && dining_halls.length > 0 ? (
                                <>
                                    <div className="row mt-5">
                                        <h2 className="mb-3">Dining Halls</h2>
                                       {
                                        dining_halls.map((dining_hall) => {
                                            const name = dining_hall.name;
                                            const address = dining_hall.address;
                                            const main_image_url = dining_hall.images[0];
                                            const dining_id = dining_hall._id;
                                            let rating = 0
                                            
                                            if(dining_hall.total_reviews){
                                                rating = (dining_hall.reviews_sum.$numberDecimal / dining_hall.total_reviews).toFixed(1)
                                            }
                                            
                                            const numerical_rating = parseFloat(rating);
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

                                            return(
                                                <div className="col-lg-4 pb-1 mb-3" key={dining_id}>
                                                    <div className="card">
                                                        <img src={main_image_url} className="card-img-top img-fluid uniform-image" alt="School Logo"/>
                                                        <div className="card-body">
                                                            <Link
                                                                to={"/dining-hall/"+ dining_id}
                                                                state={{dining_hall: dining_hall}}
                                                                className="text-decoration-none text-dark">
                                                                <h5 className="card-title">{name}</h5>
                                                            </Link>
                                                            <p>{address}</p>
                                                            <div style={{ width: '50px'}}>
                                                                <h4 className={color}>{rating}</h4>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                       }
                                    </div>
                                </>
                                
                            ):(
                                <h4>No dining halls for this school yet...</h4>
                            )
                        }
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default School;