import axios from 'axios'

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ERROR = "ERROR";
const USER = "USER";

const logIn = (userinfo) => {
    return {
        type: LOGIN,
        payload: userinfo
    }
}

const logOut = () => {
    return {
        type: LOGOUT
    }
}

const error = (err) => {
    return {
        type: ERROR,
        payload: err
    }
}

const user = () => {
    return {
        type: USER
    }
}
export const logOutThunk = () => (dispatch) => {
    dispatch(logOut());
}

export const loginThunk = (user) => async (dispatch) => {
    try {
        let { data } = await axios.post(`https://wya-api.herokuapp.com/user/login`, user)
        dispatch(logIn(data));
    }
    catch (authError) {
        console.log("Error Caught!",authError)
        let err = { error : "Username or Password is Invalid"};
        console.log(err, "this is the error returned!")
        return dispatch(error(err));
    }
}

export const getUserThunk = () => (dispatch) => {
    dispatch(user());
}

export default userReducer = (state = {}, action) => {
    switch (action.type) {
        case USER:
            return state;
        case LOGIN:
            return action.payload
        case LOGOUT:
            return {}
        case ERROR:
            return action.payload
        default:
            return state;
    }
}