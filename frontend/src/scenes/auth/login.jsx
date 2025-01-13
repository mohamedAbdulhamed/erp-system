import { Box, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import axios from "../../api/axios"
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Header from "../../components/Header";
import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";

import { handleError } from "../../utils/utils.ts"

import { ROLES } from '../../config/constants.ts';

const Login = () => {
  const LOGIN_URL = "/Account/login";

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleFormSubmit = async (values) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(LOGIN_URL, values, {
        withCredentials: true,
      });

      const token = response?.data?.Result.token;
      const user = response?.data?.Result.user;

      // const token = 'token';
      // const user = {
      //   username: "mohamed123",
      //   firstName: "Mohamed",
      //   lastName: "asd",
      //   role: ROLES.admin,
      // }

      setAuth({ user, token });

      setSuccess(`اهلا بيك ${user?.username}, يتم اعادة توجيهك!`);

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);

    } catch (err) {
      handleError(err);
    }

    setLoading(false);
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  useEffect(() => {
  
    localStorage.setItem("persist", persist);

  }, [persist]);

  if (loading)
    {
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
    <Box m="20px">
      <Header title="تسجيل الدخول" subtitle="سجل دخولك عشان تقدر تستخدم البرنامج" />

      {success && <Alert severity="success" sx={{ marginBottom: '50px' }}>{success}</Alert>}

      {error && (Array.isArray(error) ? error.map((errMsg, index) => (
        <Alert key={index} severity="error" sx={{ marginBottom: '50px' }}>
          {errMsg}
        </Alert>
      )) : (
        <Alert severity="error" sx={{ marginBottom: '50px' }}>
          {error}
        </Alert>
      ))}

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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="اسم المستخدم"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="كلمة المرور"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={persist}
                    onChange={togglePersist}
                    name="persist"
                    color="info"
                  />
                }
                label="تذكرني"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                تسجيل الدخول
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  username: "",
  password: "",
};

export default Login;
