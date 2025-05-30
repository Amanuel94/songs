import { authActions } from "features/authSlice";
import { useAppDispatch } from "hooks/stateHooks";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(authActions.logout({}));
        navigate("/");
    }, [dispatch, navigate]);

    return (
        <>
            <h3>You are logged out</h3>
            <Link to="/">Go to Home</Link>
        </>
    );
};

export default Logout;
