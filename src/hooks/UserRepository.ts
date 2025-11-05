import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const registerApiClient = new APIClient<string>("/User");

export const useGetUsers = () => {
	return useQuery({
		queryKey: ["users"], // cache key
		queryFn: () => registerApiClient.getAll(),
		enabled: false,
	});
};
