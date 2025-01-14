import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Header from "../../components/Header";
import Alert from "@mui/material/Alert";
import Loading from "../../components/Loading";
import { handleError } from "../../utils/utils.ts";
import { toast } from "react-toastify";

const Devices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [suppliers, setSuppliers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchSuppliers = async () => {
      setLoading(true);

      try {
        const response = await axiosPrivate.get("/Supplier/GetAll", {
          signal: controller.signal,
        });

        isMounted && setSuppliers(response.data.Result);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  const columns = [
    {
      field: "supplierID",
      headerName: "لينك",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/suppliers/${params.value}`}
          variant="text"
          sx={{ color: colors.blueAccent[500], textDecoration: "underline" }}
        >
          عرض
        </Button>
      ),
    },
    {
      field: "supplierName",
      headerName: "اسم المورد",
      flex: 1,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "رقم الهاتف",
      flex: 1,
      editable: true,
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
          onClick={() => handleDelete(params.row.supplierID)}
        >
          حذف
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/Supplier/Delete/${id}`);

      setSuppliers((prev) => prev.filter((supplier) => supplier.supplierID !== id));
    } catch (err) {
      handleError(err);
    }
  };

  const handleRowUpdate = async (updatedRow, oldRow) => {
    // Construct the object to be sent to the API
    const updatedSupplierData = {
      supplierId: updatedRow.supplierID,
      supplierName: updatedRow.supplierName,
      phoneNumber: updatedRow.phoneNumber,
    };

    // 1. Update UI Immediately
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.supplierID === updatedRow.supplierID ? updatedRow : supplier
      )
    );

    try {
      // Call API to update product
      await axiosPrivate.put(
        "/Supplier/Update",
        updatedSupplierData
      );

      // Success: UI is already updated

      toast.success("تم تحديث بيانات المورد بنجاح");

      return updatedRow;
    } catch (error) {
      // Failure: Revert UI and display error
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.supplierID === updatedRow.supplierID ? oldRow : supplier
        )
      );
      handleError(error);
    }
  };

  const handleUpdateError = (error) => {
    toast.error("حدث خطأ أثناء تحديث بيانات المورد");
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
      <Header title="الموردين" subtitle="بيانات الموردين" />

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
          rows={suppliers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.supplierID}
          processRowUpdate={handleRowUpdate} // Handle edits
          onProcessRowUpdateError={handleUpdateError} // Handle errors during the update process
          experimentalFeatures={{ newEditingApi: true }} // Enable new editing API
        />
      </Box>
    </Box>
  );
};

export default Devices;
