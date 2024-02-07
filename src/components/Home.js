import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';
import '../App.css';
import Navbar from "../Navbar";
import lookup from "../imgs/lookup.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import SchoolDataService from "../services/school-service";

const Home = () => {
    const [schoolName, setSchoolName] = useState(""); // State to store the school name entered in the input
    const [top_5_schools, setTop_5_schools] = useState([]); // State to store the top 5 schools

    const { user } = useContext(UserContext);

    useEffect(() => {
      // Function to get the top 5 schools
      const getTop_5_schools = () => {
        SchoolDataService.getAll()
        .then(response => {
          setTop_5_schools(response.data.schools.slice(0,6));
        })
        .catch(e => {
          console.log(e);
        });
      };

      getTop_5_schools();
    }, [user]);

    const handleChange = (event) => {
      setSchoolName(event.target.value);
    };

    return(
        <div className="App scrollable-component">
          <Navbar/>
          <div className="container d-flex align-items-center justify-content-center main-body">
            <div>
             <div className="row">
               <div className="col-md-7">
                 <h1 className="display-3 fw-bold text-start text-dark">TYPE YOUR SCHOOL...</h1> 
               </div>
             </div>
             <div className="row">
               <div className="col">
               <div className="input-group input-group-lg">
                 <input type="text" className="form-control bg-black text-white" aria-label="Search by school" value={schoolName}
                  onChange={handleChange}/>
                 <span className="input-group-text bg-black text-white" id="inputGroup-sizing-lg">
                   <Link to={`/school-search/${encodeURIComponent(schoolName)}`}>
                     <img src= {lookup}/>
                   </Link>
                 </span>
               </div>
               </div>
             </div>
             <div className="row mt-3">
               <div className="col">
                 <p>The number ☝️ location for dining hall ratings and information in the country</p>
               </div>
             </div>
            </div>
          </div>
        <div className="container-fluid">
          <h1 className="mt-5">Top Schools</h1>
          <div className="row mt-5">
              {
                top_5_schools.map((school) => {
                  const name = school.name;
                  const id = school._id;
                  const address = school.address;
                  const logo = school.logo;

                  return (
                    <div className="col-lg-2 pb-1 mt-2 mb-3" key={id}>
                      <div className="card">
                        <img className="card-img-top uniform-image" src={logo} alt="School logo cap"/>
                        <div className="card-body">
                          <Link 
                          to={"/school/"+ id}
                          state={{school: school}} 
                          className="text-decoration-none text-dark">
                            <h5 className="card-title">{name}</h5>
                          </Link>
                          <p className="card-text">{address}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
          </div>
        </div>
        </div>
    )
}

export default Home;