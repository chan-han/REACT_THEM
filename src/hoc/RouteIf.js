import {Route, Redirect, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import React from "react";
import {getToken} from "../helpers/checkAuth";

export const RouteIf = ({option, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                // 권한 체크
                const isAuth = getToken();
                //로그인을 하지 않았을때
                if (option == null && Component) {
                    return <Component {...props}  />;
                }
                if (!isAuth) {
                    //옵션이 true일때 로그인으로 강제 이동
                    if (option) {
                        toast.error('로그인 후 이용가능한 서비스 입니다.');
                        return <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: props.location}
                            }}
                        />

                    }
                } else {
                    if (!option) {
                        // window.location.href = '/login';
                        toast.error('이미 로그인 되어 있습니다.');
                        return <Redirect
                            to={{
                                pathname: "/",
                                state: {from: props.location}
                            }}
                        />
                    }
                }
                if (Component) {
                    // role을 컴포넌트에 전달
                    return <Component {...props}  />
                }

                return null
            }}
        />
    )
}
