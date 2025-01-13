import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Header from "../../components/Header";
import Alert from "@mui/material/Alert";
import Loading from "../../components/Loading";
import { handleError, truncateString } from "../../utils/utils.ts";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosPrivate.get("/Product", {
          signal: controller.signal,
        });

        console.log(response.data)

        isMounted && setProducts(response.data.Result);

        setError(null);

        setLoading(false);
      } catch (err) {
        handleError(err);
      }

      setLoading(false);
    };

    fetchProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  const columns = [
    {
      field: "productID",
      headerName: "لينك",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/products/${params.value}`}
          variant="text"
          sx={{ color: colors.blueAccent[500], textDecoration: "underline" }}
        >
          LINk
        </Button>
      ),
    },
    {
      field: "name",
      headerName: "اسم المنتج",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "الوصف",
      flex: 1,
      // add srting length limit
      valueGetter: (params) => truncateString(params.value, 130),
      cellClassName: "description-column--cell",
    },
    {
      field: "sellingPrice",
      headerName: "سعر البيع",
      type: "number",
      flex: 1,
    },
    {
      field: "purchasePrice",
      headerName: "سعر الشراء",
      type: "number",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "الكمية",
      type: "number",
      flex: 1,
    },
    {
      field: "reorderLevel",
      headerName: "حد الطلب",
      type: "number",
      flex: 1,
    },
    {
      field: "productCategory",
      headerName: "الفئة",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "الصلاحيات",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.redAccent[500],
            color: colors.grey[100],
            borderRadius: "4px",
          }}
          onClick={() => handleDelete(params.row.id)}
        >
          حذف
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/Product/${id}`);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      handleError(err);
    }
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
      <Header title="المنتجات" subtitle="بيانات المنتجات" />

      {error &&
        Array.isArray(error) &&
        error.map((errMsg, index) => (
          <Alert key={index} severity="error" sx={{ marginBottom: "50px" }}>
            {errMsg}
          </Alert>
        ))}

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          direction: "ltr",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .status-on": {
            color: colors.greenAccent[500],
          },
          "& .status-off": {
            color: colors.redAccent[500],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.productID}
        />
      </Box>
    </Box>
  );
};

export default Products;
