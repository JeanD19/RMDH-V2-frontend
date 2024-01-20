import React, { useState, useEffect, createContext } from 'react';
import UserDataService from './services/user-service';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                console.log("Rechecking session...")
                // const response = await UserDataService.checkLoggedIn();
                // console.log(response);
                // if (response.data.user) {
                //     setUser(response.data.user);
                //     console.log(user);
                // }
                const response = await UserDataService.testSession(10001, "test_user");
                console.log(response);
                //setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSession();
    }, []);

    return(
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {!isLoading ? children : <div>Loading...</div>} {/* Or any other loading indicator */}
        </UserContext.Provider>
    )
}
