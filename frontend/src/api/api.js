import axios from "axios";
import {
  mockCustomers,
  mockVehicles,
  mockTestRides,
  mockServices,
} from "../data/mockData";
import { TOKEN_KEY } from "../auth/AuthContext";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const client = axios.create({ baseURL: BASE_URL, timeout: 8000 });

// Attach the logged-in user's token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the session has expired / token is invalid, send the user back to login
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("sangam_crm_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Generic safe-get: tries the live API, falls back to mock data only on
// network-level failures (not on auth failures) so the UI is always demo-ready
// when the backend is briefly unreachable.
async function safeGet(path, fallback) {
  try {
    const res = await client.get(path);
    return { data: res.data, live: true };
  } catch (err) {
    if (err?.response?.status === 401) throw err;
    return { data: fallback, live: false };
  }
}


export const api = {
  getCustomers: () => safeGet("/customers", mockCustomers),
  addCustomer: (payload) => client.post("/customers/add", payload),
  updateCustomer: (id, payload) => client.put(`/customers/${id}`, payload),
  deleteCustomer: (id) => client.delete(`/customers/${id}`),

  getVehicles: () => safeGet("/vehicles", mockVehicles),
  addVehicle: (payload) => client.post("/vehicles/add", payload),
  updateVehicle: (id, payload) => client.put(`/vehicles/${id}`, payload),
  deleteVehicle: (id) => client.delete(`/vehicles/${id}`),

  getTestRides: () => safeGet("/testrides", mockTestRides),
  addTestRide: (payload) => client.post("/testrides/add", payload),
  updateTestRide: (id, payload) => client.put(`/testrides/${id}`, payload),
  deleteTestRide: (id) => client.delete(`/testrides/${id}`),

  getServices: () => safeGet("/services", mockServices),
  addService: (payload) => client.post("/services/add", payload),
  updateService: (id, payload) => client.put(`/services/${id}`, payload),
  deleteService: (id) => client.delete(`/services/${id}`),
};
