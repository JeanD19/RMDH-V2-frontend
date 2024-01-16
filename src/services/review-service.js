import http from "../http-common";

class ReviewDataService {

    //Get all the reviews for a dining hall
    getReviews(dining_id) {
        return http.get(`/api/reviews?dining_id=${dining_id}`);
    }

    //Add a review
    addReview(data) {
        return http.post("/api/reviews", data);
    }
}

export default new ReviewDataService();