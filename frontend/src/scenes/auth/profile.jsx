import {
  TextField,
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Alert from "@mui/material/Alert";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(null);
  const [user, setUser] = useState({});


  const handleFormSubmit = (values) => {
    console.log(values);
    console.error("handle change password")
  };

  return (
    <Box p={4} mx="auto">
      {error &&
        Array.isArray(error) &&
        error.map((errMsg, index) => (
          <Alert key={index} severity="error" sx={{ marginBottom: "50px" }}>
            {errMsg}
          </Alert>
        ))}

      <Box display="flex" alignItems="center" flexDirection="column" mb={4}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h5" fontWeight="bold">
          {auth?.user?.firstName + " " + auth?.user?.lastName}
        </Typography>
        <Typography color={colors.grey[100]}>
          @{auth?.user?.username}
        </Typography>
        <Typography color={colors.grey[100]}>{auth?.user?.email}</Typography>
        {Array.isArray(auth.roles) && auth.roles.length > 0 && (
          <Typography variant="h5" color={colors.greenAccent[500]}>
            {auth.roles.map((role, index) => (
              <span key={index}>
                {role}
                {index < auth.roles.length - 1 && ", "}
              </span>
            ))}
          </Typography>
        )}
      </Box>

      <Divider />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        m={4}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className="w-100">
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Old Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.oldPassword}
                  name="oldPassword"
                  error={!!touched.oldPassword && !!errors.oldPassword}
                  helperText={touched.oldPassword && errors.oldPassword}
                  sx={{ gridColumn: "span 8" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name="newPassword"
                  error={!!touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Change Password
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  oldPassword: yup.string().required("Required"),
  newPassword: yup
    .string()
    .required("Required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default Profile;
