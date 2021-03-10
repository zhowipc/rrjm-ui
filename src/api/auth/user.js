import request from "@/utils/request";

export default {
    test11(msg) {
        return request({
            url: "system/cfg/user/11",
            method: "post",
            data: msg
        });
    },
    getAllUserByCond(search) {
        return request({
            url: `system/cfg/user`,
            method: "get",
            params: search
        });
    },
    delUser(user) {
        return request({
            url: `system/cfg/user`,
            method: "delete",
            data: user
        });
    },
    updateUserRoles(userId, rids) {
        return request({
            url: `system/cfg/user/${userId}/${rids}`,
            method: "post"
        });
    },
    checkUsername(username) {
        return request({
            url: `system/cfg/user/${username}`,
            method: "get"
        });
    },
    updateInfo(user) {
        return request({
            url: `system/cfg/user`,
            method: "put",
            data: user
        });
    },
    modifiedPass(oldpass, pass) {
        return request({
            url: `system/cfg/user/modifiedPass`,
            method: "post",
            data: {
                oldpass,
                pass
            }
        });
    },
    info() {
        return request({
            url: "info",
            method: "get"
        });
    },

};