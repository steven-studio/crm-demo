// 📦 API Endpoints

export const constants = {};

export const apiHeaders = {
  contentType: "Content-Type",
  application_json: "application/json",
  multipart_data: "multipart/form-data",
  language: "LANG",
  authorization: "Authorization",
};

const ENDPOINTS = {
  adminLogin: "admin/login",
  adminForgotPassword: "admin/forgot-password",
  adminResetPassword: "admin/reset-password",
  adminChangePassword: "admin/change-password",
  adminDetail: "admin/get/details",
  adminUpdate: "admin/update/details",

  // USER
  getUsers: "user/get",
  adminUpdateUser: "user/admin/update",
  adminChangeUserPassword: "user/admin/change-password",
  adminResetUserPassword: "user/admin/reset-password",
  requestLoan: "user/request-loan",
  updateLoanStatus: "user/request-loan/status",
  requestLoanInstallment: "user/request-loan/installment",

  // FAQ
  faq: "admin/faq",

  // Setting
  setting: "admin/setting",

  // Dashboard
  getDashboard: "admin/dashboard",
};

export default ENDPOINTS;
