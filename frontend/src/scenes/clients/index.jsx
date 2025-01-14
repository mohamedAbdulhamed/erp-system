import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { handleError } from "../../utils/utils.ts";


const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchClients = async () => {
      setLoading(true);
  
      try {
        const response = await axiosPrivate.get('/Customer/GetAll', { signal: controller.signal });

        // const modifiedData = response.data.Result.map(client => ({
        //   ...client,
        //   createdAt: new Date(client.createdAt + "T12:00:00"),
        //   updatedAt: new Date(client.updatedAt + "T12:00:00"),
        // }));


        console.log(response.data.Result);
        isMounted && setClients(response.data.Result);
      } catch (err) {
       handleError(err);
      }
      
      setLoading(false);
    };

    fetchClients();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [axiosPrivate, navigate, location]);

  const columns = [
    {
      field: "id",
      headerName: "لينك",
      flex: 0.25,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/client/${params.value}`}
          variant="text"
          sx={{ color: colors.blueAccent[500] }}
        >
          عرض
        </Button>
      ),
    },
    {
      field: "customerName",
      headerName: "اسم العميل",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "العنوان",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "رقم الهاتف",
      flex: 1,
    },
    {
      field: "customerType",
      headerName: "نوع العميل",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "الإجراءات",
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
    
    try{
      await axiosPrivate.delete(`/Client/Delete/${id}`);

      setClients(prev => prev.filter(client => client.id !== id));

    } catch (err) {
      handleError(err);
    }
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
      <Header
        title="العملاء"
        subtitle="بيانات العملاء"
      />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
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
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={clients}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.customerName}
        />
      </Box>
    </Box>
  );
};

export default Clients;
