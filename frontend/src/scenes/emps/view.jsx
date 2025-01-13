import { useParams } from "react-router-dom";
import { Typography, Paper, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Loading from "../../components/Loading";
import Alert from "@mui/material/Alert";

const UserView = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setError(null);

    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(`/Account/GetUserById/${id}`, { signal: controller.signal });

        isMounted && setUser(response.data);
      } catch (err) {
        if (!err?.response) {
          setError("No Server Response! Try Again Later.");
        } else if (err.response?.status === 400) {
          setError("Somethign went wrong!");
        } else if (err.response?.status === 401) {
          setError("UnAutherized, Please Login!");

          setTimeout(() => {
            navigate("/login", { state: { from: location }, replace: true });
          }, 2000);
        } else {
          setError("Fetching User Failed, Maybe Try to ReLogin.");

          setTimeout(() => {
            navigate("/login", { state: { from: location }, replace: true });
          }, 2000);
        }
      }

      setLoading(false);
    };

    fetchUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, navigate, location, axiosPrivate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Loading />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: "50px" }}>
          {error}
        </Alert>
      )}
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.primary[500] }}
        >
          User Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Name: {user.firstName + " " + user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          User Name: {user.userName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {user.email}
        </Typography>
      </Paper>
    </Container>
  );
};

export default UserView;
