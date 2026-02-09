import api from "../index";
import ENDPOINTS from "../endpoints";

export const createFaq = (payload) => api(ENDPOINTS.faq, payload, "post");

export const updateFaq = (id, payload) =>
  api(`${ENDPOINTS.faq}/${id}`, payload, "put");

export const deleteFaq = (id) => api(`${ENDPOINTS.faq}/${id}`, null, "delete");

export const getFaqById = (id) => api(`${ENDPOINTS.faq}/${id}`, null, "get");

export const getAllFaqs = () => api(ENDPOINTS.faq, null, "get");
