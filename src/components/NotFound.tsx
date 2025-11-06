import { Box, Text, Button, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bg="#F5F7FB"
			className="font-geist"
		>
			<VStack spacing={6} textAlign="center">
				<Heading fontSize="9xl" fontWeight="bold" color="gray.300">
					404
				</Heading>
				<Heading fontSize="2xl" fontWeight="semibold" color="gray.700">
					Page Not Found
				</Heading>
				<Text fontSize="lg" color="gray.600" maxW="md">
					The page you're looking for doesn't exist or has been moved.
				</Text>
				<Button
					leftIcon={<FiHome />}
					colorScheme="blue"
					size="lg"
					onClick={() => navigate("/dashboard")}
				>
					Go to Dashboard
				</Button>
			</VStack>
		</Box>
	);
};

export default NotFound;

