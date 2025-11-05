import { Box, Button, Flex } from "@chakra-ui/react";
import { toast, Toaster } from "sonner";
import { useGetAdmins } from "../hooks/AdminRepository";
import { useGetUsers } from "../hooks/UserRepository";
import { useNavigate } from "react-router-dom";

const Dashboard2 = () => {
	const {
		isLoading: isAdminLoading,
		refetch: refetchAdmins,
		isFetching: isAdminFetching,
	} = useGetAdmins();

	const {
		isLoading: isUserLoading,
		refetch: refetchUsers,
		isFetching: isUserFetching,
	} = useGetUsers();

	const handleAdminFetch = () => {
		refetchAdmins().then((result) => {
			if (result.isSuccess && result.data) toast.success(result.data);
			else if (result.isError && result.error)
				toast.error((result.error as Error).message);
		});
	};

	const handleUserFetch = () => {
		refetchUsers().then((result) => {
			if (result.isSuccess && result.data) toast.success(result.data);
			else if (result.isError && result.error)
				toast.error((result.error as Error).message);
		});
	};

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.info("You have been logged out.");
		navigate("/login"); // uncomment if you use React Router
	};

	return (
		<>
			<Toaster position="top-right" richColors />

			<Box
				color="white"
				minH="100vh"
				display="flex"
				alignItems="center"
				justifyContent="center"
				className="font-geist"
				position="relative" // important for positioning the Logout button
			>
				{/* 🔝 Fixed Logout button at top-right */}
				<Button
					colorScheme="gray"
					variant="outline"
					position="absolute"
					top="20px"
					right="20px"
					onClick={handleLogout}
				>
					Logout
				</Button>

				{/* Center content */}
				<Flex gap={4}>
					<Button
						colorScheme="red"
						onClick={handleAdminFetch}
						isLoading={isAdminFetching || isAdminLoading}
					>
						Admin Settings
					</Button>

					<Button
						colorScheme="blue"
						onClick={handleUserFetch}
						isLoading={isUserFetching || isUserLoading}
					>
						User Settings
					</Button>
				</Flex>
			</Box>
		</>
	);
};

export default Dashboard2;
