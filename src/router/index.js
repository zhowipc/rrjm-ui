import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: Login,
        hidden: true
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        children: [{
            path: "/info",
            name: "个人中心",
            component: () =>
                import ("@/views/AdminInfo")
        }]
    }
];

const router = new VueRouter({
    routes
});

export default router;