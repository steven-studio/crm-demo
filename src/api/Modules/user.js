import api from "../index";
import ENDPOINTS from "../endpoints";

export const getUsers = () => api(ENDPOINTS.getUsers, {}, "get");

export const getUsersByUserId = (id) =>
  api(`${ENDPOINTS.getUsers}/${id}`, null, "get");

export const adminUpdateUser = (id, payload) =>
  api(`${ENDPOINTS.adminUpdateUser}/${id}`, payload, "put");

export const adminChangeUserPassword = (id, payload) =>
  api(`${ENDPOINTS.adminChangeUserPassword}/${id}`, payload, "put");

export const adminResetUserPassword = (id, payload) =>
  api(`${ENDPOINTS.adminResetUserPassword}/${id}`, payload, "put");

export const getAllLoanRequests = (params) => {
  const url = ENDPOINTS.requestLoan;

  const queryParams = new URLSearchParams();

  if (params.status) queryParams.append("status", params.status);
  if (params.userId) queryParams.append("userId", params.userId);
  if (params.startDate && params.endDate) {
    queryParams.append("startDate", params.startDate);
    queryParams.append("endDate", params.endDate);
  }

  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);

  const finalUrl = queryParams.toString()
    ? `${url}?${queryParams.toString()}`
    : url;

  return api(finalUrl, null, "get");
};

export const updateLoanStatus = (id, payload) =>
  api(`${ENDPOINTS.updateLoanStatus}/${id}`, payload, "put");

export const getLoanInstallment = (id, userId) =>
  api(`${ENDPOINTS.requestLoanInstallment}/${id}/${userId}`, null, "get");
