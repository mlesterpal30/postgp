import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import {
	FiHome,
	FiPackage,
	FiActivity,
	FiDollarSign,
	FiTrendingUp,
	FiBarChart2,
	FiSettings,
} from "react-icons/fi";

import {
	Box,
	Flex,
	HStack,
	VStack,
	Text,
	Icon as ChakraIcon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Heading,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
	IoMailOutline,
	IoNotificationsOutline,
	IoPersonOutline,
	IoSearchOutline,
} from "react-icons/io5";

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 1024;
			setIsMobile(mobile);
			setIsOpen(!mobile);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const location = useLocation();
	const currentPath = location.pathname;
	console.log("Current Path:", currentPath); // Debugging line
	const links = [
		{ to: "/users", label: "Dashboard", icon: <FiHome /> }, // Home/dashboard
		{ to: "/production", label: "Production", icon: <FiPackage /> }, // Eggs / Production
		{
			to: "/sales",
			label: "Sales",
			icon: <FiActivity />,
			children: [
				{ to: "/sales/overview", label: "Overview" },
				{ to: "/sales/invoices", label: "Invoices" },
				{ to: "/sales/customers", label: "Customers" },
			],
		}, // Transactions / Sales
		{ to: "/expenses", label: "Expenses", icon: <FiDollarSign /> }, // Expenses / Cost
		{ to: "/profit", label: "Profit", icon: <FiTrendingUp /> }, // Profit / Growth
		{ to: "/reports", label: "Reports", icon: <FiBarChart2 /> }, // Reports / Analytics
		{ to: "/settings", label: "Settings", icon: <FiSettings /> }, // App settings
	];

	const [expandedKey, setExpandedKey] = useState<string | null>(null);
	// Responsiveness handled by Chakra's useBreakpointValue

	return (
		<>
			{/* (moved hamburger into navbar) */}

			{/* Overlay */}
			<AnimatePresence>
				{isMobile && isOpen && (
					<motion.div
						key="overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						onClick={() => setIsOpen(false)}
						className="fixed inset-0 bg-black z-30 lg:hidden"
						style={{ willChange: "opacity" }}
					/>
				)}
			</AnimatePresence>

			{/* Sidebar */}
			<AnimatePresence>
				{isOpen && (
					<motion.aside
						key="sidebar"
						initial={{ x: -300 }}
						animate={{ x: 0 }}
						exit={{ x: -300 }}
						transition={{
							type: "tween",
							duration: 0.3,
							ease: "easeInOut",
						}}
						className="fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-gray-800 font-inter font-medium lg:translate-x-0 shadow-lg"
						style={{ willChange: "transform" }}
					>
						<div className="h-full px-3 py-4 overflow-y-auto">
							{/* Logo */}
							<Heading
								fontSize="xl"
								textAlign={"center"}
								mb={"4"}
								color={"gray.700"}
							>
								Admin Portal
							</Heading>

							<ul className="space-y-2">
								{links.map((link) => {
									const isActive = currentPath === link.to; // manual active check
									const activeClasses =
										isActive ||
										(link.children &&
											currentPath.startsWith(link.to + "/"))
											? " text-blue-500 dark:text-blue-400"
											: "text-gray-700 dark:text-gray-300";

									return (
										<li
											key={link.to}
											className={`p-1 rounded ${activeClasses}`}
										>
											{link.children ? (
												<button
													onClick={() =>
														setExpandedKey((k) =>
															k === link.to ? null : link.to
														)
													}
													className={`w-full flex items-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
														expandedKey === link.to
															? "bg-gray-100 dark:bg-gray-700/60 font-medium"
															: ""
													}`}
													aria-expanded={expandedKey === link.to}
												>
													<span className="flex items-center gap-2 flex-1 ml-3">
														{React.cloneElement(link.icon, {
															className: "flex-shrink-0",
															size: 20,
														})}
														{link.label}
													</span>
													<span className="text-gray-500 dark:text-gray-400">
														{expandedKey === link.to ? "▾" : "▸"}
													</span>
												</button>
											) : (
												<NavLink
													to={link.to}
													onClick={() =>
														isMobile && setIsOpen(false)
													}
													className={`flex items-center gap-2 rounded p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition `}
												>
													{React.cloneElement(link.icon, {
														className: "flex-shrink-0",
														size: 20,
													})}
													{link.label}
												</NavLink>
											)}

											{link.children && (
												<AnimatePresence initial={false}>
													{expandedKey === link.to && (
														<motion.ul
															key="submenu"
															initial={{ opacity: 0, height: 0 }}
															animate={{
																opacity: 1,
																height: "auto",
															}}
															exit={{ opacity: 0, height: 0 }}
															transition={{
																duration: 0.22,
																ease: "easeInOut",
															}}
															className="ml-6 pl-4 space-y-1 border-l-4 border-blue-500 "
														>
															{link.children.map((child) => (
																<li key={child.to}>
																	<NavLink
																		to={child.to}
																		onClick={() =>
																			isMobile &&
																			setIsOpen(false)
																		}
																		className="flex items-center gap-1.5 rounded pl-8 pr-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
																	>
																		<span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></span>
																		{child.label}
																	</NavLink>
																</li>
															))}
														</motion.ul>
													)}
												</AnimatePresence>
											)}
										</li>
									);
								})}
							</ul>
						</div>
					</motion.aside>
				)}
			</AnimatePresence>

			{/* Main Area */}
			<Flex
				direction="column"
				minH="100vh"
				ml={isMobile ? 0 : isOpen ? "16rem" : 0}
				transition="margin-left 0.3s ease"
			>
				{/* Navbar */}
				<Flex
					as="nav"
					w="full"
					bg="#F5F7FB"
					borderBottomWidth="1px"
					borderColor="gray.200"
					_dark={{ bg: "gray.900", borderColor: "gray.700" }}
					px={6}
					py={3}
					align="center"
					justify="space-between"
				>
					{/* Left: Toggle + Search box */}
					<HStack spacing={3} flex="1" maxW="md">
						<IconButton
							aria-label="Toggle sidebar"
							icon={<Text as="span">☰</Text>}
							onClick={() =>
								isMobile ? setIsOpen(true) : setIsOpen((v) => !v)
							}
							variant="ghost"
						/>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<IoSearchOutline color="gray" size={20} />
							</InputLeftElement>
							<Input
								placeholder="Search task"
								bg="white"
								_dark={{ bg: "gray.700", color: "white" }}
								borderRadius="full"
								_focus={{
									boxShadow: "outline",
									borderColor: "blue.400",
								}}
								size="md"
							/>
						</InputGroup>
					</HStack>

					{/* Right: Icons + User info */}
					<HStack spacing={5} ml={6}>
						<IconButton
							aria-label="Mail"
							icon={<ChakraIcon as={IoMailOutline} boxSize={5} />}
							variant="ghost"
						/>
						<IconButton
							aria-label="Notifications"
							icon={
								<ChakraIcon as={IoNotificationsOutline} boxSize={5} />
							}
							variant="ghost"
						/>
						<HStack spacing={2}>
							<ChakraIcon as={IoPersonOutline} boxSize={6} />
							<VStack spacing={0} align="start" fontSize="sm">
								<Text fontWeight="medium">John Doe</Text>
								<Text
									color="gray.500"
									_dark={{ color: "gray.400" }}
									fontSize="xs"
								>
									john@example.com
								</Text>
							</VStack>
						</HStack>
					</HStack>
				</Flex>

				{/* Nested Routes */}
				<Box flex="1" p={2} bg="#F5F7FB" _dark={{ bg: "gray.900" }}>
					<Outlet />
				</Box>
			</Flex>
		</>
	);
};

export default App;
