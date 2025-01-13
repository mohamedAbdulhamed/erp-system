import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from "react-router-dom";


import Header from "../../components/Header";
import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";

import { handleError } from "../../utils/utils.ts";

const Emps = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [emps, setEmps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setError(null);

    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get("/Account/GetUsers", { signal: controller.signal });

        setError(null);

        isMounted && setEmps(response.data);

      } catch (err) {
        handleError(err);
      }

      setLoading(false);
    };

    fetchUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [axiosPrivate, location, navigate]);

  const columns = [
    { field: "id", headerName: "لينك" },
    {
      field: "fullName",
      headerName: "الاسم",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "رقم الهاتف",
      flex: 1,
    },
    {
      field: "salary",
      headerName: "الراتب",
      type: "number",
      flex: 1,
    },
    {
      field: "hiredDate",
      headerName: "تاريخ التعيين",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "الصلاحيات",
      flex: 1,
    }
  ];

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
      <Header title="الموظفين" subtitle="بيانات الموظفين" />
      
      {error && (
        <Alert severity="error" sx={{ marginBottom: '50px' }}>
          {error}
        </Alert>
      )}
      
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
            color: colors.greenAccent[200],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: colors.grey[100],
          },
        }}
      >
        <DataGrid rows={emps} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Emps;
