import * as actionTypes from "./actionType";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationDate => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};
export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/api-user/login/", {
        email: email,
        password: password
      })
      .then(res => {
        const token = res.data.token;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  email,
  password,
  confirm,
  first_name,
  last_name,
  phone_number
) => {
  return dispatch => {
    dispatch(authStart());
    const obj = {
      email: email,
      password: password,
      profile: {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number
      }
    };
    console.log(obj);
    axios
      .post("/api-user/signup/", {
        email: email,
        password: password,
        profile: {
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number
        }
      })
      .then(res => {
        console.log(res);
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        console.log(localStorage.getItem(token));
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token == undefined) {
      dispatch(logout);
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
