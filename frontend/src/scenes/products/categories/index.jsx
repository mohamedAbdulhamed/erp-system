import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/utils.ts";
import { tableArabicLocalText } from "../../../config/constants.ts";

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCategories = async () => {
      setLoading(true);

      try {
        const response = await axiosPrivate.get("/Product/categories", {
          signal: controller.signal,
        });

        if (isMounted) {
          setCategories(response.data.Result);
        }

        setLoading(false);
      } catch (err) {
        handleError(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  const columns = [
    {
      field: "name",
      headerName: "اسم الفئة",
      flex: 3,
      editable: true,
      cellClassName: "name-column--cell",
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
          onClick={() => handleDelete(params.row.productCategoryId)}
        >
          حذف
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/Product/${id}`);

      setCategories((prev) => prev.filter((category) => category.productCategoryId !== id));
    } catch (err) {
      handleError(err);
    }
  };

  const handleRowUpdate = async (updatedRow, oldRow) => {
    // Construct the object to be sent to the API
    const updatedCategoryData = {
      name: updatedRow.name,
    };

    // 1. Update UI Immediately
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.productCategoryId === updatedRow.productCategoryId ? updatedRow : category
      )
    );

    try {
      // Call API to update product
      const response = await axiosPrivate.put(
        `/Product/categories/update/${updatedRow.productCategoryId}`,
        updatedCategoryData
      );

      // Success: UI is already updated

      toast.success("تم تحديث بيانات الفئة بنجاح");

      return updatedRow;
    } catch (error) {
      // Failure: Revert UI and display error
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.productCategoryId === updatedRow.productCategoryId ? oldRow : category
        )
      );
      handleError(error);
    }
  };

  const handleUpdateError = (error) => {
    toast.error("حدث خطأ أثناء تحديث بيانات الفئة");
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
      <Header title="الفئات" subtitle="بيانات الفئات" />

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
          rows={categories}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.productCategoryId}
          processRowUpdate={handleRowUpdate} // Handle edits
          onProcessRowUpdateError={handleUpdateError} // Handle errors during the update process
          experimentalFeatures={{ newEditingApi: true }} // Enable new editing API
          localeText={{
            noRowsLabel: "لا توجد فئات",
            ...tableArabicLocalText,
          }}
        />
      </Box>
    </Box>
  );
};

export default Categories;
