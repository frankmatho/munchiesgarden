import {
  createBrowserRouter
} from "react-router-dom";
import App from '../App';
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadFood from "../dashboard/UploadFood";
import ManageFood from "../dashboard/ManageFoods";
import EditFood from "../dashboard/EditFoods";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import Profile from "../dashboard/Profile";
import Orders from "../dashboard/Orders";
import Checkout from "../context/checkout";
import OrderProgress from "../userorder/orderprogress"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: []
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadFood />
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageFood />
      },
      {
        path: "/admin/dashboard/editfoods/:id",
        element: <EditFood />,
        loader: ({ params }) => fetch(`http://localhost:5000/food/${params.id}`)
      },
      {
        path: "/admin/dashboard/profile",
        element: <Profile />
      },
      {
        path: "/admin/dashboard/orders",
        element: <Orders />
      }
    ]
  },
  {
    path: "/sign-up",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path:"/Checkout/orderprogress",
    element: <OrderProgress />
  }
]);

export default router;
