import axios from "axios";

export function callApi(method, uri, data = undefined, token = false) {
    const axiosRequestConfig = {
        method: method,
        url: 'https://wallet.atoth.workers.dev' + uri
    };

    if (data) {
        axiosRequestConfig.data = data;
    }

    if (token) {
        axiosRequestConfig.headers = {'Authorization': 'Bearer ' + token};
    }

    return axios(axiosRequestConfig);

}