import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { handleError } from "../../utils/utils.ts";
import { toast } from "react-toastify";

const NewClient = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const [customerTypes, setCustomerTypes] = useState([
    { value: 0, label: "new" },
    { value: 1, label: "commercial" },
  ]);
  const [initialValues, setInitialValues] = useState({
    customerName: "",
    address: "",
    phoneNumber: "",
    customerType: 0,
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      await axiosPrivate.post("/Customer/AddCustomer", values);

      toast.success("تم اضافة العميل بنجاح");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCustomerTypes = async () => {
      setLoading(true);

      try {
        const response = await axiosPrivate.get("/Customer/GetCustomerTypes", {
          signal: controller.signal,
        });

        const customerTypes = response.datamap((type) => ({
          value: type.id,
          label: type.name,
        }));

        isMounted && setCustomerTypes(customerTypes);

        if (customerTypes.length > 0) {
          setInitialValues((prevValues) => ({
            ...prevValues,
            factory: customerTypes[0].value,
          }));
        }
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerTypes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [navigate, axiosPrivate, location]);

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
      <Header title="العملاء" subtitle="اضف عميل جديد" />

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
                label="اسم العميل"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customerName}
                name="customerName"
                error={!!touched.customerName && !!errors.customerName}
                helperText={touched.customerName && errors.customerName}
                sx={{ gridColumn: "span 2" }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="العنوان"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
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
                required
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="نوع العميل"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customerType}
                name="customerType"
                error={!!touched.customerType && !!errors.customerType}
                helperText={touched.customerType && errors.customerType}
                sx={{ gridColumn: "span 2" }}
                SelectProps={{ native: true }}
                required
              >
                {customerTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                اضافة
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  customerName: yup.string().required("اسم العميل مطلوب"),
  address: yup.string(),
  phoneNumber: yup.string().required("رقم الهاتف مطلوب"),
  customerType: yup.number().required("نوع العميل مطلوب"),
});

export default NewClient;
