import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";

const AllRoutes = () => {
    const routesObj = useRoutes([
      {path: "/", element: <Home />},
      {path: "/signin", element: <SignIn />},
      {path: "/dashboard", element: <Profile />},
    ]);
  
    return routesObj;
  };
  
  export default AllRoutes;