import axios from "axios";
import {
  GENERIC_ERROR_MESSAGE,
  SERVER_AUTH_ERROR_STATUS_CODE,
  SERVER_VALIDATION_STATUS_CODE,
} from "../utils/constants.js";
import LocalstorageService from "../utils/helpers/localstorage-services.js";
import { IN_URL } from "../BaseUrl.js";

const API_URL = IN_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = LocalstorageService.getLoggedInUserToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config });
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config });
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config });
}

export async function delPayload(url, data = {}, config = {}) {
  return await axiosApi.delete(url, {
    Authorization: { ...config },
    data: { ...data },
  });
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, {
    "Content-Type": "multipart/form-data",
    ...config,
  });
}

export async function putFormData(url, data, config = {}) {
  return axiosApi.put(url, data, {
    "Content-Type": "multipart/form-data",
    ...config,
  });
}

export async function getPdf(url, responseType = "blob", config = {}) {
  return axiosApi.get(url, { ...config, responseType });
}

export async function postPdf(url, responseType = "application/pdf", config = {}, data) {
  return axiosApi.post(url, responseType, { ...config }, data);
}

export async function postExel(url, responseType = "vnd.openxmlformats-officedocument.spreadsheetml.sheet", config = {}, data) {
  return axiosApi.post(url, responseType, { ...config }, { ...data });
}