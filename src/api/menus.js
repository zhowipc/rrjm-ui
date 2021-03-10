import request from "@/utils/request";

export default {
    initMenus() {
        return request({
            url: `/system/cfg/menu`,
            method: "get"
        });
    }
};