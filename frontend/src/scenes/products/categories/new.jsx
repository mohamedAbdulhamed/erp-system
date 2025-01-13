import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "../../../components/Header";
import Alert from '@mui/material/Alert';
import Loading from "../../../components/Loading";
import { handleError } from "../../../utils/utils.ts";

const NewCategory = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [categories, setCategories] = useState([]);
  const [initialValues] = useState({
    name: "",
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    setError(null); 
    setSuccess(null);
    
    try {
      await axiosPrivate.post("/Product/categories/add", values);

      setSuccess("تم اضافة الفئة");
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
      <Header title="الفئات" subtitle="اضف فئة جديد" />

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
                label="اسم الفئة"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                اضف فئة جديدة
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("الاسم مطلوب"),
});

export default NewCategory;
