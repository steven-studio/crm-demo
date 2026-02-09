import api from "../index";
import ENDPOINTS from "../endpoints";

export const createSetting = (payload) =>
  api(ENDPOINTS.setting, payload, "post");

export const updateSetting = (id, payload) =>
  api(`${ENDPOINTS.setting}/${id}`, payload, "put");

export const getSetting = (params) => {
  const url = ENDPOINTS.setting;

  const queryParams = new URLSearchParams();
  if (params.select) queryParams.append("select", params.select);

  const finalUrl = queryParams.toString()
    ? `${url}?${queryParams.toString()}`
    : url;

  return api(finalUrl, null, "get");
};
