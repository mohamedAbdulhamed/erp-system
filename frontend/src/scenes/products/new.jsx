import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";
import { handleError } from "../../utils/utils.ts";

const NewProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    sellingPrice: 0.0,
    buyingPrice: 0.0,
    quantity: 0,
    reorderLevel: 10,

    productCategoryID: '', // id
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setError(null); 
    setSuccess(null); 
    setLoading(true);

    const fetchData = async () => {

      try {
        const response = await axiosPrivate.get("/Product/categories", { signal: controller.signal });

        const categories = response.data.Result.map((category) => ({
          value: category.productCategoryId,
          label: category.name,
        }));

        if (isMounted) {
          setCategories(categories);
        }

        if (categories.length > 0) {
          setInitialValues((prevValues) => ({
            ...prevValues,
            productCategoryID: categories[0].value,
          }));
        }
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [navigate, axiosPrivate, location]);
  
  const handleFormSubmit = async (values) => {
    console.log(values)
    setError(null); 
    setSuccess(null);
    setLoading(true);
    
    try {
      const res = await axiosPrivate.post("/Product", values);
      console.log(res)
      
      setSuccess("تم اضافة المنتج");
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
      <Header title="المنتجات" subtitle="اضف منتج جديد" />

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
                label="اسم المنتج"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="وصف المنتج"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="سعر بيع المنتج"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sellingPrice}
                name="sellingPrice"
                error={!!touched.sellingPrice && !!errors.sellingPrice}
                helperText={touched.sellingPrice && errors.sellingPrice}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="سعر شراء المنتج"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.buyingPrice}
                name="buyingPrice"
                error={!!touched.buyingPrice && !!errors.buyingPrice}
                helperText={touched.buyingPrice && errors.buyingPrice}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="الكمية"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="كمية إعادة الطلب"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reorderLevel}
                name="reorderLevel"
                error={!!touched.reorderLevel && !!errors.reorderLevel}
                helperText={touched.reorderLevel && errors.reorderLevel}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                select
                fullWidth
                variant="filled"
                label="فئة المنتج"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productCategoryID}
                name="productCategoryID"
                error={!!touched.productCategoryID && !!errors.productCategoryID}
                helperText={touched.productCategoryID && errors.productCategoryID}
                sx={{ gridColumn: "span 2" }}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                اضف المنتج
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
  description: yup.string(),
  sellingPrice: yup.number().required("سعر البيع مطلوب"),
  buyingPrice: yup.number().required("سعر الشراء مطلوب"),
  quantity: yup.number().required("الكمية مطلوبة"),
  reorderLevel: yup.number().required("كمية إعادة الطلب مطلوبة"),
  productCategoryID: yup.number().required("فئة المنتج مطلوبة"),
});

export default NewProduct;
