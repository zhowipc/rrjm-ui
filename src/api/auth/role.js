import request from "@/utils/request";
export default {
    getAllRoles() {
        return request({
            url: "system/cfg/role",
            method: "get"
        });
    }
};