import { Box, useTheme, Button, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { handleError } from "../../utils/utils.ts";
import { toast } from "react-toastify";
import { tableArabicLocalText } from "../../config/constants.ts";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const [getProductsResponse, getCategoriesResponse] = await Promise.all([
          axiosPrivate.get("/Product", { signal: controller.signal }),
          axiosPrivate.get("/Product/categories", {
            signal: controller.signal,
          }),
        ]);

        if (!isMounted) return;

        setProducts(getProductsResponse.data.Result);
        setCategories(getCategoriesResponse.data.Result);

        setLoading(false);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
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
          عرض
        </Button>
      ),
    },
    {
      field: "name",
      headerName: "اسم المنتج",
      flex: 1,
      editable: true,
      headerClassName: "green-column--header",
      cellClassName: "green-column--cell",
    },
    {
      field: "description",
      headerName: "الوصف",
      flex: 1,
      editable: true,
      cellClassName: "description-column--cell",
    },
    {
      field: "sellingPrice",
      headerName: "سعر البيع",
      type: "number",
      editable: true,
      flex: 1,
      headerClassName: "green-column--header",
      cellClassName: "green-column--cell",
    },
    {
      field: "purchasePrice",
      headerName: "سعر الشراء",
      type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "الكمية",
      type: "number",
      editable: true,
      flex: 1,
      headerClassName: "green-column--header",
      cellClassName: "green-column--cell",
    },
    {
      field: "reorderLevel",
      headerName: "حد الطلب",
      type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "productCategory",
      headerName: "الفئة",
      flex: 1,
      editable: true,
      valueFormatter: (productCategory) => productCategory.name || "N/A",
      renderEditCell: (params) => (
        <Select
          value={params.value?.productCategoryId || ""}
          onChange={(event) => {
            const selectedCategory = categories.find(
              (category) =>
                category.productCategoryId === parseInt(event.target.value)
            );

            if (selectedCategory) {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: selectedCategory,
              });
            }
          }}
        >
          {categories.map((category) => (
            <MenuItem
              kkey={category.productCategoryId}
              value={category.productCategoryId}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      ),
      headerClassName: "green-column--header",
      cellClassName: "green-column--cell",
    },
    {
      field: "actions",
      headerName: "الصلاحيات",
      flex: 2,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.redAccent[500],
            color: colors.grey[100],
            borderRadius: "4px",
          }}
          onClick={() => handleDelete(params.row.productID)}
        >
          حذف
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/Product/${id}`);

      setProducts((prev) => prev.filter((product) => product.productID !== id));
    } catch (err) {
      handleError(err);
    }
  };

  const handleRowUpdate = async (updatedRow, oldRow) => {
    // Construct the object to be sent to the API
    const updatedProductData = {
      name: updatedRow.name,
      description: updatedRow.description,
      sellingPrice: updatedRow.sellingPrice,
      purchasePrice: updatedRow.purchasePrice,
      quantity: updatedRow.quantity,
      reorderLevel: updatedRow.reorderLevel,
      productCategoryID: updatedRow.productCategory.productCategoryId,
    };

    // 1. Update UI Immediately
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productID === updatedRow.productID ? updatedRow : product
      )
    );

    try {
      // Call API to update product
      const response = await axiosPrivate.put(
        `/Product/${updatedRow.productID}`,
        updatedProductData
      );

      // Success: UI is already updated

      toast.success("تم تحديث المنتج بنجاح");

      return updatedRow;
    } catch (error) {
      // Failure: Revert UI and display error
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productID === updatedRow.productID ? oldRow : product
        )
      );
      handleError(error);
    }
  };

  const handleUpdateError = (error) => {
    toast.error("حدث خطأ أثناء تحديث المنتج");
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
          "& .green-column--cell, & .green-column--header": {
            color: colors.greenAccent[300],
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
          processRowUpdate={handleRowUpdate} // Handle edits
          onProcessRowUpdateError={handleUpdateError} // Handle errors during the update process
          experimentalFeatures={{ newEditingApi: true }} // Enable new editing API
          localeText={{
            noRowsLabel: "لا توجد منتجات",
            ...tableArabicLocalText,
          }}
          sx={{ direction: "ltr" }}
        />
      </Box>
    </Box>
  );
};

export default Products;
