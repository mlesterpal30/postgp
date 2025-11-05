import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Text,
	VStack,
	Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type { PostUser } from "../entity/PostUser";
import { useCreateUser } from "../hooks/AccountRepository";

const Register = () => {
	const { register, handleSubmit, reset } = useForm<PostUser>();
	const createUser = useCreateUser();

	const onSubmit = (data: PostUser) => {
		createUser.mutate(data, {
			onSuccess: () => {
				console.log("User created successfully");
				reset();
			},
			onError: (error) => {
				console.error("Error creating user:", error);
			},
		});
	};

	return (
		<Box
			color="white"
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			className="font-geist"
		>
			<Box
				bg="white"
				color="black"
				p={8}
				rounded="xl"
				shadow="lg"
				width="100%"
				maxW="sm"
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing={5}>
						<Heading size="lg" textAlign="center">
							Create Account
						</Heading>

						<FormControl id="username">
							<FormLabel>Username</FormLabel>
							<Input
								{...register("username")}
								placeholder="Enter your username"
								borderColor="black"
								focusBorderColor="gray.700"
							/>
						</FormControl>

						<FormControl id="email">
							<FormLabel>Email</FormLabel>
							<Input
								{...register("email")}
								placeholder="Enter your email"
								borderColor="black"
								focusBorderColor="gray.700"
							/>
						</FormControl>

						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								{...register("password")}
								type="password"
								placeholder="Enter your password"
								borderColor="black"
								focusBorderColor="gray.700"
							/>
						</FormControl>

						<Button
							width="100%"
							bg="#ED1B24"
							color="white"
							_hover={{ bg: "#C8161C" }}
							type="submit"
						>
							Register
						</Button>

						<Text fontSize="sm" textAlign="center">
							Already have an account?{" "}
							<Link
								as={RouterLink}
								to="/login"
								color="black"
								fontWeight="bold"
								_hover={{ textDecoration: "underline" }}
							>
								Login
							</Link>
						</Text>
					</VStack>
				</form>
			</Box>
		</Box>
	);
};

export default Register;
