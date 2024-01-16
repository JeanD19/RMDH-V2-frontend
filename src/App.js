import React from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import { UserProvider } from './UserContext';
import Profile from "./components/Profile";
import SchoolSearch from "./components/school-search";
import School from "./components/school";
import DiningHall from "./components/dining-hall";
import AddReview from "./components/add-review";
import './App.css';

const App = () => {


  return (
    <UserProvider>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/sign-in" element={<SignIn/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/school-search/:schoolName" element={<SchoolSearch/>}></Route>
        <Route exact path="/school/:id" element={<School/>}/>
        <Route exact path="/dining-hall/:id" element={<DiningHall/>}/>
        <Route exact path="/dining-hall/:id/review" element={<AddReview/>}/>
      </Routes>
    </UserProvider>
    
  );
}

export default App;
