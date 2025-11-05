import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const registerApiClient = new APIClient<string>("/Admin");

export const useGetAdmins = () => {
	return useQuery({
		queryKey: ["admin"], // cache key
		queryFn: () => registerApiClient.getAll(),
		enabled: false,
	});
};
