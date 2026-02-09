import api from "../index";
import ENDPOINTS from "../endpoints";

export const getDashboard = () => api(ENDPOINTS.getDashboard, {}, "get");