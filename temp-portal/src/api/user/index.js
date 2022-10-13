import request from "../../utils/request.js";

export default {
    login(params) {
        request({
            url: '/user/login',
            method: 'post',
            data: params,
            mock: true
        })
    }
}
