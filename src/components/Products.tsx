import { useState } from "react";
import {
	Box,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import {
	useGetProducts,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
} from "../hooks/ProductRepository";
import type { Product, CreateProduct, UpdateProduct } from "../entity/Product";

const Products = () => {
	const { data: products, isLoading } = useGetProducts();
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const deleteProduct = useDeleteProduct();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<CreateProduct>({
		defaultValues: {
			name: "",
			price: 0,
			description: "",
			imageUrl: "",
			category: "",
		},
	});

	const handleOpenCreate = () => {
		setEditingProduct(null);
		reset({
			name: "",
			price: 0,
			description: "",
			imageUrl: "",
			category: "",
		});
		onOpen();
	};

	const handleOpenEdit = (product: Product) => {
		setEditingProduct(product);
		reset({
			name: product.name,
			price: product.price,
			description: product.description,
			imageUrl: product.imageUrl,
			category: product.category,
		});
		onOpen();
	};

	const onSubmit = (data: CreateProduct) => {
		if (editingProduct) {
			updateProduct.mutate(
				{ id: editingProduct.id, data: data as UpdateProduct },
				{
					onSuccess: () => {
						onClose();
						reset();
					},
				}
			);
		} else {
			createProduct.mutate(data, {
				onSuccess: () => {
					onClose();
					reset();
				},
			});
		}
	};

	const handleDelete = (id: number) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			deleteProduct.mutate(id);
		}
	};

	if (isLoading) {
		return (
			<Box p={4}>
				<Text>Loading products...</Text>
			</Box>
		);
	}

	return (
		<Box p={6} className="font-geist">
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
				<Text fontSize="2xl" fontWeight="bold">
					Products
				</Text>
				<Button leftIcon={<FiPlus />} colorScheme="blue" onClick={handleOpenCreate}>
					Add Product
				</Button>
			</Box>

			<TableContainer>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Name</Th>
							<Th>Price</Th>
							<Th>Category</Th>
							<Th>Description</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{products && products.length > 0 ? (
							products.map((product) => (
								<Tr key={product.id}>
									<Td>{product.id}</Td>
									<Td>{product.name}</Td>
									<Td>${product.price.toFixed(2)}</Td>
									<Td>{product.category}</Td>
									<Td>{product.description}</Td>
									<Td>
										<IconButton
											aria-label="Edit product"
											icon={<FiEdit />}
											size="sm"
											mr={2}
											onClick={() => handleOpenEdit(product)}
										/>
										<IconButton
											aria-label="Delete product"
											icon={<FiTrash2 />}
											size="sm"
											colorScheme="red"
											onClick={() => handleDelete(product.id)}
										/>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={6} textAlign="center">
									No products found
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
			</TableContainer>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{editingProduct ? "Edit Product" : "Create Product"}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<VStack spacing={4}>
								<FormControl>
									<FormLabel>Name</FormLabel>
									<Input
										{...register("name")}
										placeholder="Enter product name"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Price</FormLabel>
									<Input
										type="number"
										step="0.01"
										{...register("price", { valueAsNumber: true })}
										placeholder="Enter price"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Category</FormLabel>
									<Input
										{...register("category")}
										placeholder="Enter category"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Image URL</FormLabel>
									<Input
										{...register("imageUrl")}
										placeholder="Enter image URL"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Description</FormLabel>
									<Input
										{...register("description")}
										placeholder="Enter description"
									/>
								</FormControl>

								<Button
									type="submit"
									colorScheme="blue"
									width="full"
									isLoading={isSubmitting || createProduct.isPending || updateProduct.isPending}
								>
									{editingProduct ? "Update" : "Create"}
								</Button>
							</VStack>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Products;

