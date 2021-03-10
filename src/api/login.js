import request from "@/utils/request";
export default {
    login(data) {
        return request({
            url: `login`,
            method: "get",
            params: data
        });
    },
    info() {
        return request({
            url: "info",
            method: "get"
        });
    },
    logout() {
        return request({
            url: "logout",
            method: "post"
        });
    }
};