import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Text,
	VStack,
	Image,
	useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import tgplogo from "../assets/tgplogo.jpg";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../hooks/AccountRepository";
import type { LoginUser } from "../entity/LoginUser";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const { register, handleSubmit } = useForm<LoginUser>();
	const loginUser = useLoginUser();

	const onSubmit = (data: LoginUser) => {
		loginUser.mutate(data, {
			onSuccess: () => {
				navigate("/dashboard");
			},
			onError: (error: any) => {
				// Extract error message from axios error response
				const errorMessage =
					error?.response?.data?.message ||
					error?.response?.data?.error ||
					error?.message ||
					"Invalid username or password";

				toast({
					title: "Login Failed",
					description: errorMessage,
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});
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
						<Image
							src={tgplogo}
							alt="TGP Logo"
							boxSize="100px"
							objectFit="contain"
							mx="auto"
						/>
						<FormControl id="username">
							<FormLabel>Username</FormLabel>
							<Input
								{...register("username")}
								placeholder="Enter your username"
								borderColor="black"
								focusBorderColor="gray.700"
								disabled={loginUser.isPending}
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
								disabled={loginUser.isPending}
							/>
						</FormControl>

						<Button
							type="submit"
							width="100%"
							bg="#ED1B24"
							color="white"
							_hover={{ bg: "#C8161C" }}
							isLoading={loginUser.isPending}
							loadingText="Login..."
							disabled={loginUser.isPending}
						>
							Login
						</Button>

						<Text fontSize="sm" textAlign="center">
							Dont have an account?{" "}
							<Link
								as={RouterLink}
								to="/"
								fontWeight="bold"
								_hover={{ textDecoration: "underline" }}
							>
								Register
							</Link>
						</Text>
					</VStack>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
