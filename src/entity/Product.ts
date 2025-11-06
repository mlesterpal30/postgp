export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	imageUrl: string;
	category: string;
}

export interface CreateProduct {
	name: string;
	price: number;
	description: string;
	imageUrl: string;
	category: string;
}

export interface UpdateProduct {
	name?: string;
	price?: number;
	description?: string;
	imageUrl?: string;
	category?: string;
}

