import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./components/Dasbhoard";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./components/Products";
import Reports from "./components/Reports";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/dashboard",
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
		children: [
			{
				path: "products",
				element: <Products />,
			},
		],
	},
	{
		path: "/products",
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <Products />,
			},
		],
	},
	{
		path: "/reports",
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <Reports />,
			},
		],
	},
	{
		path: "/drawer",
		element: <Dashboard />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
