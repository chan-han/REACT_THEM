import {isExpired} from "react-jwt";

import jwt_decode from "jwt-decode";
import {toast} from "react-toastify";
import axios from "axios";

const Crypto = require('crypto-js');
const deleteCookie = function (name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

const getCookie = function (name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};


export const getToken = () => {
    return getCookie('access-token');
}
export const getUserInfo = () => {
    const token = getCookie('access-token');
    return jwt_decode(token)
}
export const checkResponseAuth = (status) => {
    if (status === 401) {
        logout();
        toast.error('세션이 만료 되었습니다. 다시 로그인 해주세요.');
        return true;
    } else {
        return false;
    }
}
export const getCurrentUserBool = () => {
    return getCookie('access-token');

}
export const resErrorCheck = (error, notfound, message) => {
    if (error) {

        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            if (error.response.status === 401) {
                checkResponseAuth(error.response.status)
            } else if (error.response.status === 404) {
                if (notfound) {
                   alert(message);
                    window.history.back();
                } else {
                    window.location.href = '/errors/404'
                    toast.error("잘못된 요청 입니다. 확인 후 다시 시도해주세요.");
                }
            } else {
                window.location.href = '/errors/500'
                toast.error("불편을 드려 대단히 죄송합니다. 현재 문제가 발생하였습니다. 나중에 다시 시도해주세요.");
            }
        } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            if (error.message === 'Network Error') {
                //서버 네트워크 에러
                //Network Error
                toast.error("지금은 해당 작업을 수행 할 수 없습니다. 다시 시도해주세요.");
            }
        } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            toast.error("불편을 드려 대단히 죄송합니다. 현재 서비스에 문제가 발생하였습니다. 나중에 다시 시도해주세요.");
        }

    }
}


export const logout = () => {
    axios.delete(`https://${process.env.REACT_APP_API_SERVER}/auth/logout`)
        .then(async function (response) {
            if (response.data.success) {
                deleteCookie('access-token');
                window.location.href = '/login';
            } else {
                toast.error('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.');
            }

        })
        .catch(function (error) {
            resErrorCheck(error);
        });

}


export const decrypt = (data, key, iv) => {

    key = Crypto.enc.Utf8.parse(key);
    iv = Crypto.enc.Utf8.parse(iv);
    let decrypted = Crypto.AES.decrypt(data, key, {iv: iv});

    return decrypted.toString(Crypto.enc.Utf8);
}

export function uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
