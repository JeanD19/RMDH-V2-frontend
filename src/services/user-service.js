import http from "../http-common";

class UserDataService {

    //Sign-up a user
    createUser(data) {
        return http.post("/api/users/sign-up", data);
    }

    //Sign-out: destroy the session
    signOut(){
        return http.delete("/api/session/destroy");
    }

    //Log in a user
    logIn(data) {
        return http.post("/api/users/log-in", data);
    }

    //Check if the user is logged in
    checkLoggedIn() {
        return http.get("/api/session");
    }
}

export default new UserDataService();