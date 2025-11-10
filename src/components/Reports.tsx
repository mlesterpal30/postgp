import React, { useState } from "react";
import {
	Box,
	Button,
	VStack,
	Text,
	Heading,
	Flex,
	Divider,
	useToast,
	Image,
} from "@chakra-ui/react";
import { FiPrinter, FiFileText } from "react-icons/fi";
import tgplogo from "../assets/tgplogo.jpg";

interface InvoiceItem {
	description: string;
	quantity: number;
	unitPrice: number;
	total: number;
}

const Reports: React.FC = () => {
	const toast = useToast();
	const [invoiceData] = useState({
		invoiceNumber: "INV-2024-001",
		date: new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		dueDate: new Date(
			Date.now() + 30 * 24 * 60 * 60 * 1000
		).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		billFrom: {
			name: "TGP Company",
			address: "123 Business Street",
			city: "City, State 12345",
			phone: "+1 (555) 123-4567",
			email: "info@tgpcompany.com",
		},
		billTo: {
			name: "Customer Name",
			address: "456 Client Avenue",
			city: "City, State 67890",
			phone: "+1 (555) 987-6543",
			email: "customer@example.com",
		},
		items: [
			{
				description: "Product A",
				quantity: 10,
				unitPrice: 50.0,
				total: 500.0,
			},
			{
				description: "Product B",
				quantity: 5,
				unitPrice: 75.0,
				total: 375.0,
			},
			{
				description: "Service Fee",
				quantity: 1,
				unitPrice: 125.0,
				total: 125.0,
			},
		] as InvoiceItem[],
	});

	const subtotal = invoiceData.items.reduce(
		(sum, item) => sum + item.total,
		0
	);
	const taxRate = 0.1; // 10% tax
	const tax = subtotal * taxRate;
	const total = subtotal + tax;

	const handleGenerateReport = () => {
		toast({
			title: "Report Generated",
			description: "Your report has been generated successfully.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const handlePrint = () => {
		window.print();
	};

	return (
		<Box p={6} bg="#F5F7FB" minH="100vh">
			{/* Action Buttons */}
			<Flex justify="flex-end" mb={6} gap={3}>
				<Button
					leftIcon={<FiFileText />}
					colorScheme="blue"
					onClick={handleGenerateReport}
				>
					Generate Report
				</Button>
				<Button
					leftIcon={<FiPrinter />}
					colorScheme="gray"
					variant="outline"
					onClick={handlePrint}
				>
					Print
				</Button>
			</Flex>

			{/* Invoice Document - Coupon Bond Format */}
			<Box
				bg="white"
				shadow="lg"
				borderRadius="md"
				p={6}
				maxW="400px"
				mx="auto"
				className="invoice-document"
			>
				{/* Header - Centered */}
				<VStack spacing={3} align="center" mb={6}>
					<Image
						src={tgplogo}
						alt="TGP Logo"
						boxSize="60px"
						objectFit="contain"
					/>
					<Heading size="md" color="gray.800" textAlign="center">
						INVOICE
					</Heading>
					<VStack spacing={1} align="center">
						<Text fontSize="xs" color="gray.600">
							Invoice #: {invoiceData.invoiceNumber}
						</Text>
						<Text fontSize="xs" color="gray.600">
							Date: {invoiceData.date}
						</Text>
						<Text fontSize="xs" color="gray.600">
							Due: {invoiceData.dueDate}
						</Text>
					</VStack>
				</VStack>

				<Divider mb={4} />

				{/* Bill From */}
				<VStack align="flex-start" spacing={1} mb={4}>
					<Text fontWeight="bold" fontSize="xs" color="gray.700">
						FROM:
					</Text>
					<Text fontSize="xs" color="gray.800" fontWeight="semibold">
						{invoiceData.billFrom.name}
					</Text>
					<Text fontSize="xs" color="gray.600">
						{invoiceData.billFrom.address}
					</Text>
					<Text fontSize="xs" color="gray.600">
						{invoiceData.billFrom.city}
					</Text>
					<Text fontSize="xs" color="gray.600">
						{invoiceData.billFrom.phone}
					</Text>
				</VStack>

				<Divider mb={4} />

				{/* Bill To */}
				<VStack align="flex-start" spacing={1} mb={4}>
					<Text fontWeight="bold" fontSize="xs" color="gray.700">
						TO:
					</Text>
					<Text fontSize="xs" color="gray.800" fontWeight="semibold">
						{invoiceData.billTo.name}
					</Text>
					<Text fontSize="xs" color="gray.600">
						{invoiceData.billTo.address}
					</Text>
					<Text fontSize="xs" color="gray.600">
						{invoiceData.billTo.city}
					</Text>
					<Text fontSize="xs" color="gray.600">
						{invoiceData.billTo.phone}
					</Text>
				</VStack>

				<Divider mb={4} />

				{/* Items Table - Compact */}
				<Box mb={4}>
					<Flex
						justify="space-between"
						fontSize="xs"
						fontWeight="bold"
						color="gray.700"
						mb={2}
						pb={1}
						borderBottom="1px solid"
						borderColor="gray.300"
					>
						<Text>Item</Text>
						<Text>Qty</Text>
						<Text>Price</Text>
						<Text>Total</Text>
					</Flex>
					{invoiceData.items.map((item, index) => (
						<Flex
							key={index}
							justify="space-between"
							fontSize="xs"
							py={1}
							borderBottom="1px solid"
							borderColor="gray.200"
						>
							<Text flex={2} color="gray.800">
								{item.description}
							</Text>
							<Text flex={1} textAlign="center" color="gray.600">
								{item.quantity}
							</Text>
							<Text flex={1} textAlign="right" color="gray.600">
								${item.unitPrice.toFixed(2)}
							</Text>
							<Text flex={1} textAlign="right" fontWeight="semibold">
								${item.total.toFixed(2)}
							</Text>
						</Flex>
					))}
				</Box>

				{/* Totals - Compact */}
				<VStack align="stretch" spacing={1} mb={4}>
					<Flex justify="space-between" fontSize="xs">
						<Text color="gray.600">Subtotal:</Text>
						<Text fontWeight="semibold">${subtotal.toFixed(2)}</Text>
					</Flex>
					<Flex justify="space-between" fontSize="xs">
						<Text color="gray.600">Tax (10%):</Text>
						<Text fontWeight="semibold">${tax.toFixed(2)}</Text>
					</Flex>
					<Divider />
					<Flex justify="space-between" fontSize="sm" pt={1}>
						<Text fontWeight="bold" color="gray.800">
							TOTAL:
						</Text>
						<Text fontWeight="bold" color="blue.600" fontSize="md">
							${total.toFixed(2)}
						</Text>
					</Flex>
				</VStack>

				<Divider mb={4} />

				{/* Footer */}
				<VStack spacing={1} align="center">
					<Text fontSize="xs" color="gray.500" textAlign="center">
						Thank you for your business!
					</Text>
					<Text fontSize="2xs" color="gray.400" textAlign="center">
						Payment due within 30 days
					</Text>
				</VStack>
			</Box>

			{/* Print Styles for Coupon Bond */}
			<style>
				{`
					@media print {
						@page {
							size: 8.5in 11in;
							margin: 0.5in;
						}
						body * {
							visibility: hidden;
						}
						.invoice-document, .invoice-document * {
							visibility: visible;
						}
						.invoice-document {
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							top: 0;
							width: 3.5in;
							max-width: 3.5in;
							box-shadow: none;
							padding: 0.5in;
							background: white;
						}
						button {
							display: none !important;
						}
					}
				`}
			</style>
		</Box>
	);
};

export default Reports;

