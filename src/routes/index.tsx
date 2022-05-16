import {useRoutes} from "react-router-dom";
import Home from "../pages/home";

const Routes = () => {
    return useRoutes([
        {path: "/", element: <Home/>}
    ]);
};

export default Routes;