import { apiurl } from './RegisterActionTypes';
import axios from "axios";
const LoginSuccess = (data) => {
    console.log("looginwucnnfjn")
    return {
        type: 'LoginSuccess',
        data: data
    }
}
const LoginFailed = () => {
    console.log("looginwucnnfjn")
    return {
        type: 'LoginFailed'
    }
}
const LoginSet = () => {
    console.log("looginwucnnfjn")
    return {
        type: 'LoginSet'
    }
}
export function loginWithPassword(details) {
    return function(dispatch) {
        return axios.post(apiurl + '/login-with-password', details).then((data) =>
            // dispatch
            // console.log(data)
            dispatch({
                type: 'LoginSuccess',
                data:data.data.result
            })
        ).catch(() => dispatch(LoginFailed()))
    };
}
