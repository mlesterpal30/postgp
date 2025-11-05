import React from "react";
import {
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Flex,
	Text,
	Icon as ChakraIcon,
	IconButton,
} from "@chakra-ui/react";
import {
	IoSearchOutline,
	IoMailOutline,
	IoNotificationsOutline,
	IoPersonOutline,
} from "react-icons/io5";

type TopNavProps = {
	onToggleSidebar: () => void;
};

const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar }) => {
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
		>
			<HStack spacing={3} flex="1" maxW="md">
				<IconButton
					aria-label="Toggle sidebar"
					icon={<Text as="span">☰</Text>}
					onClick={onToggleSidebar}
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
						_focus={{ boxShadow: "outline", borderColor: "blue.400" }}
						size="md"
					/>
				</InputGroup>
			</HStack>

			<HStack spacing={5} ml={6}>
				<IconButton
					aria-label="Mail"
					icon={<ChakraIcon as={IoMailOutline} boxSize={5} />}
					variant="ghost"
				/>
				<IconButton
					aria-label="Notifications"
					icon={<ChakraIcon as={IoNotificationsOutline} boxSize={5} />}
					variant="ghost"
				/>
				<HStack spacing={2}>
					<ChakraIcon as={IoPersonOutline} boxSize={6} />
					<Text fontWeight="medium" fontSize="sm">
						John Doe
					</Text>
				</HStack>
			</HStack>
		</Flex>
	);
};

export default TopNav;
