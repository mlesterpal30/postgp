import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JWT token and extracts the payload
 */
export const decodeToken = (token: string): any => {
	try {
		return jwtDecode(token);
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};

/**
 * Gets the user role from the JWT token stored in localStorage
 * .NET Identity uses ClaimTypes.Role: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
 */
export const getUserRole = (): string | null => {
	const token = localStorage.getItem("token");
	if (!token) return null;

	const decoded = decodeToken(token);
	if (!decoded) return null;

	const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
	return role || null;
};

/**
 * Checks if the current user is an admin
 */
export const isAdmin = (): boolean => {
	const role = getUserRole();
	return role?.toLowerCase() === "admin";
};

/**
 * Gets the username from the JWT token stored in localStorage
 * .NET Identity uses JwtRegisteredClaimNames.Sub which is "sub"
 */
export const getUsername = (): string | null => {
	const token = localStorage.getItem("token");
	if (!token) return null;

	const decoded = decodeToken(token);
	if (!decoded) return null;

	// JwtRegisteredClaimNames.Sub maps to "sub" claim
	return decoded.sub || null;
};

/**
 * Checks if the user is authenticated (has a token)
 */
export const isAuthenticated = (): boolean => {
	return !!localStorage.getItem("token");
};

