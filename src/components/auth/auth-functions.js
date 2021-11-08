/* eslint-disable */

import axios from "axios";

export async function loginUser(username, password) {
  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`,
      {
        username,
        password,
      }
    );
    if (status === 200) {
      localStorage?.setItem(
        "notify_login",
        JSON.stringify({ isLoggedIn: true, token: data.token })
      );
      return { loginStatus: true, token: data.token };
    } else {
      return { loginStatus: false, token: null };
    }
  } catch (error) {
    console.log(error);
    return { loginStatus: false, token: null };
  }
}

export async function logoutUser() {
  localStorage.removeItem("notify_login");
}

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function setupAuthExceptionHandler(navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
}

export async function signup(username, password, email, name, tags) {
  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/signup`,
      {
        user: {
          username,
          password,
          email,
          name,
          tags
        },
      }
    );
    if (status === 200) {
      localStorage?.setItem(
        "notify_login",
        JSON.stringify({ isLoggedIn: true, token: data.token })
      );
      return { signupStatus: true, token: data.token };
    } else {
      return { signupStatus: false, token: null };
    }
  } catch (error) {
    console.log(error);
    return { signupStatus: false, token: null };
  }
}
