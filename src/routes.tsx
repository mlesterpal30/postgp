import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./components/Dashboard";

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
		element: <Dashboard />,
	},
]);

export default router;
