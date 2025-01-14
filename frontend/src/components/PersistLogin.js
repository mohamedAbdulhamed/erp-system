import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { Box } from "@mui/material";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, []);


    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ?
                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    >
                    <Loading />
                    </Box>
                    :
                    <Outlet />

            }
        </>
    )
}

export default PersistLogin;