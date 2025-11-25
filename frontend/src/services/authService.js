import axios from "axios";

const API_URL = "http://https://srihampharma.onrender.com/api/auth";  // backend URL

// Local Signup
export const signup = (data) => axios.post(`${API_URL}/signup`, data);

// Local Signin
export const signin = (data) => axios.post(`${API_URL}/signin`, data);

// Google Signin
export const googleSignin = (data) => axios.post(`${API_URL}/google`, data);
