import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import {
	type Product,
	type CreateProduct,
	type UpdateProduct,
} from "../entity/Product";

const productApiClient = new APIClient<Product>("/Product");

// Get all products
export const useGetProducts = () => {
	return useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: () => productApiClient.getAll(),
	});
};

// Get single product by ID
export const useGetProduct = (id: number) => {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => productApiClient.get(id),
		enabled: !!id,
	});
};

// Create product
export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateProduct) => productApiClient.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

// Update product
export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: UpdateProduct }) =>
			productApiClient.update(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
		},
	});
};

// Delete product
export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => productApiClient.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

