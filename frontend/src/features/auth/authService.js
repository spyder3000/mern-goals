import axios from "axios";

const API_URL = "/api/users/";

// Register User
const register = async (userData) => {
	const response = await axios.post(API_URL, userData);
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data)); // will include our token
	}

	return response.data;
};

// Login User
const login = async (userData) => {
	const response = await axios.post(API_URL + "login", userData);
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data)); // will include our token
	}

	return response.data;
};

// Logout user
const logout = () => {
	console.log(
		'authService.js -- begin logout() -- localStorage.removeItem("user"'
	);
	localStorage.removeItem("user");
};

const authService = {
	register,
	logout,
	login,
};

export default authService;
