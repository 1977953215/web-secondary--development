import axios from "axios";
import qs from "querystringify";

let apiContextPath = "";
if (process.env.NODE_ENV === "development") {
  document.cookie =
<<<<<<< HEAD
<<<<<<< HEAD
    "token=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY3MjcxNDYyMDE4MSwidXNlcklkIjoiMTIzNDU2Nzg5MCJ9.oBBkfvocQHAQLP4uRGWlpcaFVwrXuoLmzaYtN2QPTpQ";
=======
    "token=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY3MzU5OTU5MzA0MSwidXNlcklkIjoiMTIzNDU2Nzg5MCJ9.E7TF9Jk5Md8vYXYB8bz7P-L9KYqXcS5X2up7Ogbw7d8";
>>>>>>> 69eb67e03c216fa71c95da16445a144fb956b746
=======
    "token=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY3MzY2ODk4Njc5MSwidXNlcklkIjoiMTIzNDU2Nzg5MCJ9.8KNIHg39ksrxP6vPX65W85x0PkGlAniWWS7Ek2oHei0";
>>>>>>> 9c010413887b42431339af720d151a0c7ebc82c5
  document.cookie =
    "refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY0NjcyMjI2ODY4Nn0.TEVE_nopHNZlvSQM_RUZrLcCzkaERiHo8nz0q-ksL3E";
  document.cookie = "username=admin";
  document.cookie = "windowOnline=true";
  apiContextPath = "/api";
}

const instance = axios.create({
  baseURL: `${apiContextPath}/dtyq/pngf/sdata/rest`,
  timeout: 60000,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  headers:
    (window.location.search && qs.parse(window.location.search).token) ||
      window.token
      ? { token: qs.parse(window.location.search).token || window.token }
      : {},
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.response.use(
  response => {
    let { data } = response;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    if (data && data.status !== 200 && !(data instanceof Blob)) {
      return Promise.reject(response);
    }
    if (data instanceof Blob) {
      response.data = data;
      return response;
    }
    response.data = data && data.result;
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      return;
    }

    return Promise.reject(error.response);
  }
);

export default instance;
