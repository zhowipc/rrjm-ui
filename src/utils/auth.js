import Cookies from "js-cookie";

const TokenKey = "Authorization123122244";
const UserKey = "user122";
export default {
    getTokenKey() {
        return TokenKey;
    },
    getUserKey() {
        return UserKey;
    },
    getToken() {
        return Cookies.get(TokenKey);
    },
    setToken(token) {
        return Cookies.set(TokenKey, "Bearer" + token);
    },
    removeToken() {
        return Cookies.remove(TokenKey);
    },
    getCurrentUser() {
        if (this.getCurrentUser2()) {
            return JSON.parse(this.getCurrentUser2());
        }
    },
    getCurrentUser2() {
        return Cookies.get(UserKey);
    },
    setCurrentUser(userInfo) {
        return Cookies.set(UserKey, userInfo)
    },
    removeCurrentUser() {
        return Cookies.remove(UserKey);
    },
};