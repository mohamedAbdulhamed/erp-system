import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});

        try {
            await axiosPrivate('/Account/logout')
        } catch (error) {
            console.error(error);
        }
    }

    return logout;
}

export default useLogout;