import { useRoutes } from "react-router-dom";
import Home from "../Home";
import SignIn from "../SignIn";
import Profile from "../Profile";

const AllRoutes = () => {
    const routesObj = useRoutes([
      {path: "/", element: <Home />},
      {path: "/signin", element: <SignIn />},
      {path: "/dashboard", element: <Profile />},
    ]);
  
    return routesObj;
  };
  
  export default AllRoutes;