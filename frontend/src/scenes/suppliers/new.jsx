import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "../../components/Header";
import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";
import { handleError } from "../../utils/utils.ts";

const NewSupplier = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [initialValues] = useState({
    supplierName: "",
    phoneNumber: "",
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    setError(null); 
    setSuccess(null);
    
    try {
      await axiosPrivate.post("/Supplier/Add", values);

      setSuccess("تم اضافة المورد");
    }  catch (err) {
      handleError(err);
    }
    
    setLoading(false);
  };

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
      <Header title="الموردين" subtitle="اضف مورد جديد" />

      {error && Array.isArray(error) && error.map((errMsg, index) => (
        <Alert key={index} severity="error" sx={{ marginBottom: '50px' }}>
          {errMsg}
        </Alert>
      ))}
      {success && <Alert severity="success" sx={{ marginBottom: '50px' }}>{success}</Alert>}

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
                label="اسم المورد"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.supplierName}
                name="supplierName"
                error={!!touched.supplierName && !!errors.supplierName}
                helperText={touched.supplierName && errors.supplierName}
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
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                اضف المورد
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({

});

export default NewSupplier;
