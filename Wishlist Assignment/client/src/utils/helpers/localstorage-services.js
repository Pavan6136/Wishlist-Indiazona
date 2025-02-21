import {
    USER_AUTH_DETAILS_KEY,
    USER_AUTH_TOKEN_KEY,
} from "../constants";

function getLoggedInUserToken() {
    const token = JSON.parse(localStorage.getItem(USER_AUTH_TOKEN_KEY));
    return token || null;
}

function setLoggedInUserDetails(user) {
    const existUser = JSON.parse(localStorage.getItem(USER_AUTH_DETAILS_KEY))
    user.id = existUser.id
    localStorage.setItem(
        USER_AUTH_DETAILS_KEY,
        JSON.stringify(user)
    );
}

function setInLocalStorage(key, value) {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

function getInLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getLoggedInUserDetails(rawJsonString = false) {
    try {
        const userDetails = localStorage.getItem(
            USER_AUTH_DETAILS_KEY
        );
        if (rawJsonString) {
            return userDetails;
        }
        return JSON.parse(userDetails);
    } catch (error) {
        return null;
    }
}

function logoutUser() {
    localStorage.removeItem(USER_AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_AUTH_DETAILS_KEY);
    localStorage.removeItem('user_id');
 

}
function loginUser({ token, user }) {
    localStorage.setItem(USER_AUTH_TOKEN_KEY, token);
    localStorage.setItem(
        USER_AUTH_DETAILS_KEY,
        JSON.stringify(user)
    );
}

const LocalstorageService = {
    getLoggedInUserToken,
    logoutUser,
    loginUser,
    setLoggedInUserDetails,
    getLoggedInUserDetails,
    setInLocalStorage,
    getInLocalStorage
};

export default LocalstorageService;
