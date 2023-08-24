import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
    return props.state.authenticated ? <Outlet/>:
    <Navigate to="/login" state={props.state} replace={true} />;
    };

export default PrivateRoute;