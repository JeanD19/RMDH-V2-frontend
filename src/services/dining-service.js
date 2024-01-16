import http from "../http-common";

class DiningDataService {

    //Get all the dining halls for a school
    getDinings(school_id) {
        return http.get(`/api/dinings?school_id=${school_id}`);
    }
    
}

export default new DiningDataService();