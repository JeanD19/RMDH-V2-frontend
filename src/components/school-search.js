import React, { useState, useRef, useEffect } from "react";
import SchoolDataService from "../services/school-service";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const SchoolSearch = props => {
    const location = useLocation();
    const [schoolName, setSchoolName] = useState(location.pathname.split("/")[2]);
    const [schools, setSchools] = useState([]); // State to store the schools that match search term

    useEffect(() => {
        const findByName = (query) => {
            console.log(query)
            SchoolDataService.find(query)
            .then(response => {
                console.log(response.data.schools.schoolsList);
                if(response.data.schools.schoolsList.length === 0){
                    console.log("No schools found");
                    setSchools(null);
                    console.log(schools);
                }
                setSchools(response.data.schools.schoolsList);
            })
            .catch(e => {
                console.log(e);
            });
        };
        
        const newSchoolName = location.pathname.split("/")[2];
        setSchoolName(newSchoolName);
        findByName(newSchoolName);
    }, [location]);

    return(
        <div className="scrollable-component">
            <Navbar/>
            <div className="container-fluid mt-5">
            <h1>Results for {decodeURIComponent(schoolName)}</h1>
            {
                schools && schools.length > 0 ? (
                    <>
                    <div className="row mt-5">
                    { schools.map((school) => {
                        const name = school.name;
                        const school_id = school._id;
                        const image_url = school.logo;
                        //console.log(school)
                        return (
                        <div className="col-lg-2 pb-1 mb-3" key={school_id}>
                            <div className="card">
                                <img src={image_url} className="card-img-top img-fluid uniform-image" alt="School Logo"/>
                                <div className="card-body">
                                    <Link
                                        to={"/school/"+ school_id}
                                        state={{school: school}}
                                        className="text-decoration-none text-dark">
                                        <h5 className="card-title">{name}</h5>
                                    </Link>
                                    <p>{school.address}</p>
                                </div>
                            </div>
                        </div>  
                        )
                    })
                    }
                    </div>
                    </>
                ) : (
                    <h4>No schools found...</h4>
                )
            }
           </div>
        </div>
        
    )

}

export default SchoolSearch;