import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
	FiHome,
	FiPackage,
	FiActivity,
	FiDollarSign,
	FiTrendingUp,
	FiBarChart2,
	FiSettings,
} from "react-icons/fi";
import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Sidebar, { type SidebarLink } from "./Sidebar";
import TopNav from "./TopNav";

const Dashboard = () => {
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
	const links: SidebarLink[] = [
		{ to: "/users", label: "Dashboard", icon: <FiHome /> },
		{ to: "/inventory", label: "Inventory", icon: <FiPackage /> },
		{
			to: "/sales",
			label: "Sales",
			icon: <FiActivity />,
			children: [
				{ to: "/sales/overview", label: "Overview" },
				{ to: "/sales/invoices", label: "Invoices" },
				{ to: "/sales/customers", label: "Customers" },
			],
		},
		{ to: "/products", label: "Products", icon: <FiDollarSign /> },
		{ to: "/profit", label: "Profit", icon: <FiTrendingUp /> },
		{ to: "/reports", label: "Reports", icon: <FiBarChart2 /> },
		{ to: "/settings", label: "Settings", icon: <FiSettings /> },
	];

	const [expandedKey, setExpandedKey] = useState<string | null>(null);

	return (
		<>
			{/* Sidebar */}
			<Sidebar
				isOpen={isOpen}
				isMobile={isMobile}
				onClose={() => setIsOpen(false)}
				currentPath={currentPath}
				links={links}
				expandedKey={expandedKey}
				setExpandedKey={setExpandedKey}
			/>

			{/* Main Area */}
			<Flex
				direction="column"
				minH="100vh"
				ml={isMobile ? 0 : isOpen ? "16rem" : 0}
				transition="margin-left 0.3s ease"
			>
				{/* Navbar */}
				<TopNav
					onToggleSidebar={() =>
						isMobile ? setIsOpen(true) : setIsOpen((v) => !v)
					}
				/>

				{/* Nested Routes */}
				<Box flex="1" p={2} bg="#F5F7FB" _dark={{ bg: "gray.900" }}>
					<Outlet />
				</Box>
			</Flex>
		</>
	);
};

export default Dashboard;
