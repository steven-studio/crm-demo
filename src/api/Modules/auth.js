import api from "../index";
import ENDPOINTS from "../endpoints";

export const adminLogin = (payload) =>
  api(ENDPOINTS.adminLogin, payload, "post");

export const adminDetail = () => api(ENDPOINTS.adminDetail, {}, "get");

export const adminUpdate = (payload) =>
  api(ENDPOINTS.adminUpdate, payload, "put");

export const adminForgotPassword = (payload) =>
  api(ENDPOINTS.adminForgotPassword, payload, "post");

export const adminResetPassword = (payload) =>
  api(ENDPOINTS.adminResetPassword, payload, "post");

export const adminChangePassword = (payload) =>
  api(ENDPOINTS.adminChangePassword, payload, "put");
