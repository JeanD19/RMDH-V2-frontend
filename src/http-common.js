import axios from "axios";


export default axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, //'http://localhost:8080',
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});