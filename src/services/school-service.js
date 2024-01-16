import http from "../http-common";

class SchoolDataService {

    //Get all the schools in the database
    getAll() {
        return http.get("/api/schools");
    }
    find(query) {
        return http.get(`/api/schools/search?name=${query}`);
    }
}

export default new SchoolDataService();