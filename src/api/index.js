import axios from "axios";
import { apiHeaders, constants } from "./endpoints";

// export let baseUrl = "https://certano-a1437ae98176.herokuapp.com/api/";
export let baseUrl = "https://cp5h187s-8002.inc1.devtunnels.ms/api/";

const api = async (path, params, method, formData) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken, "User Token");

  let options = {
    headers: {
      ...(formData ? {} : { "Content-Type": apiHeaders.application_json }),
      ...(userToken && {
        Authorization: `Bearer ${userToken}`,
      }),
    },
    method: method,
    ...(params && { data: formData ? params : JSON.stringify(params) }),
  };

  console.log(baseUrl + path, options, "options");
  console.log("FormData:", formData, "Params:", params);
  return axios(baseUrl + path, options)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
      if (error?.response?.data?.error === "Invalid or expired token") {
        return constants.expireTokenModal.openModal({
          title: "Session Expired",
          message: error?.response?.data?.error,
        });
      }
      return error.response;
    });
};

export default api;
