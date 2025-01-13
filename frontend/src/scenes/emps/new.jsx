import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Alert from "@mui/material/Alert";
import Loading from "../../components/Loading";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

import { handleError } from "../../utils/utils.ts";

const NewEmp = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [initialValues] = useState({
    fullName: "",
    phoneNumber: "",
    salary: 0.0,
    hiredDate: dayjs(),
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axiosPrivate.post("/Account/register", values);

      setSuccess("User added successfully! redirecting you to /users");

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (err) {
      handleError(err);
    }

    setLoading(false);
  };

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
    <Box m="20px">
      <Header title="الموظفين" subtitle="اضف عامل جديد" />

      {error && (
        <Alert severity="error" sx={{ marginBottom: "50px" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: "50px" }}>
          {success}
        </Alert>
      )}

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
          setFieldValue,
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
                label="اسم العامل"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="رقم الهاتف"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="الراتب"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="تاريخ التعيين"
                  value={values.hiredDate}
                  onChange={(newValue) => setFieldValue("hiredDate", newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      error={!!touched.hiredDate && !!errors.hiredDate}
                      helperText={touched.hiredDate && errors.hiredDate}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                إنشاء موظف جديد
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("اسم العامل مطلوب"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,15}$/, "رقم الهاتف غير صحيح")
    .required("رقم الهاتف مطلوب"),
  salary: yup
    .number()
    .min(0, "الراتب لا يمكن ان يكون اقل من 0")
    .required("الراتب مطلوب"),
  hiredDate: yup.date().required("تاريخ التعيين مطلوب").nullable(),
});

export default NewEmp;
