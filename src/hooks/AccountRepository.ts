import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { type PostUser } from "../entity/PostUser";
import { type LoginUser } from "../entity/LoginUser";

const registerApiClient = new APIClient("/Account/register");
export const useCreateUser = () => {
	return useMutation({
		mutationFn: (data: PostUser) => registerApiClient.create(data),
	});
};

const loginApiClient = new APIClient("/Account/login");
export const useLoginUser = () => {
	return useMutation({
		mutationFn: (data: LoginUser) =>
			loginApiClient.create(data).then((response) => {
				if (response.token) {
					localStorage.setItem("token", response.token);
				}
				return response;
			}),
	});
};
