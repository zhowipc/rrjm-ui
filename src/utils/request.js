import axios from "axios";
import { Notification, MessageBox, Message } from "element-ui";
import authApi from "@/utils/auth";
import { getBaseUrl } from "@/utils/env";

const service = axios.create({
    baseURL: getBaseUrl(),
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: authApi.getToken()
    }
});
service.interceptors.request.use(
    config => {
        console.log("配置token");
        if (authApi.getToken()) {
            config.headers.Authorization = authApi.getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
    },
    error => {
        console.log(error);
    }
);

service.interceptors.response.use(
    res => {
        // 未设置状态码则默认成功状态
        console.log(res.data);
        const code = res.data.code;
        // 获取错误信息
        const msg = res.data.message;
        if (code === 20000) Message.success({ message: msg });
        else Message.error({ message: msg });
        return res.data;
    },
    error => {
        console.log("err" + error);
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Message({
            message: message,
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;