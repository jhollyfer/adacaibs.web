import { AUTHENTICATION_ID } from "@/context/autenticacao";
import axios from "axios";

const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333",
  withCredentials: true,
});

const AUTHENTICATION_SESSION_PAYLOAD =
  sessionStorage.getItem(AUTHENTICATION_ID);

if (
  !AUTHENTICATION_SESSION_PAYLOAD ||
  AUTHENTICATION_SESSION_PAYLOAD === null
) {
  sessionStorage.clear();
}

if (AUTHENTICATION_SESSION_PAYLOAD) {
  const _json = JSON.parse(AUTHENTICATION_SESSION_PAYLOAD);

  if (!_json?.token) {
    sessionStorage.clear();
  }

  AXIOS_INSTANCE.defaults.headers["Authorization"] = `Bearer ${_json?.token}`;
}

AXIOS_INSTANCE.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    // const isUnauthorized =
    //   error?.response?.status === 401 &&
    //   error?.response?.data?.message === "Unauthorized";

    // if (isUnauthorized) {
    //   sessionStorage.clear();
    //   window.location.reload();
    // }

    return Promise.reject(error);
  }
);

export { AXIOS_INSTANCE };
