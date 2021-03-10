import router from "@/router";
import store from "@/store";
import { Message } from "element-ui";
import authApi from '@/utils/auth'
import { initMenus } from "@/utils/menus";
import loginApi from '@/api/login'

router.beforeEach((to, from, next) => {
    if (authApi.getToken()) {
        initMenus(router, store);
        if (!authApi.getCurrentUser()) {
            return loginApi.info().then(resp => {
                if (resp) {
                    console.log("存入信息" + JSON.stringify(resp.obj.nickName));
                    authApi.setCurrentUser(JSON.stringify(resp.obj))
                    store.commit("INIT_ADMIN", resp.obj);
                    next();
                }

            });
        }
        next();
    } else {
        if (to.path == "/") next();
        else {
            next("/?redirect=" + to.path);
        }
    }
});