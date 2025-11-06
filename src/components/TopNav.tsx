import React from "react";
import { Flex, Text, IconButton, Button, HStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { getUsername } from "../utils/auth";

type TopNavProps = {
	onToggleSidebar: () => void;
};

const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar }) => {
	const navigate = useNavigate();
	const username = getUsername();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
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
			className="font-geist"
		>
			<IconButton
				aria-label="Toggle sidebar"
				icon={<Text as="span">☰</Text>}
				onClick={onToggleSidebar}
				variant="ghost"
			/>

			<HStack spacing={4}>
				{username && (
					<HStack spacing={1}>
						<Icon as={FaRegCircleUser} boxSize={6} />
						<Text fontWeight="medium" fontSize="sm">
							{username}
						</Text>
					</HStack>
				)}
				<Button
					colorScheme="red"
					variant="outline"
					size="sm"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</HStack>
		</Flex>
	);
};

export default TopNav;
