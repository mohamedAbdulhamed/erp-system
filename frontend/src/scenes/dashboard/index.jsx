import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from "react-router-dom";

import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";
import StatBox from "../../components/StatBox";

import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ProductionQuantityLimits from '@mui/icons-material/ProductionQuantityLimits';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [actionLogs, setActionLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchActionLogs = async () => {
      setLoading(true);

      try {
        const response = await axiosPrivate.get("https://localhost:7001/api/Account/GetLogs", { signal: controller.signal });
  
        const data = response.data.map(log => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
  
        isMounted && setActionLogs(data);
  
        setLoading(false);
  
      } catch (err) {
        if (!err?.response)
        {
          // setError("No Server Response, Please Try Again Later!"); 
          console.error("No Server Response! Try Again Later.");
        } else if (err.response?.status === 400)
        {
          setError("Missing Username or Password, Please Validate The Request!")
        } else if (err.response?.status === 401)
        {
          setError("UnAutherized, Please Login!");
          
          setTimeout(() => {
            navigate('/login', { state: { from: location }, replace: true });
          }, 2000);
  
        } else {
          setError("Fetching Logs Failed, Maybe Try ReLogin!");
  
          setTimeout(() => {
            navigate('/login', { state: { from: location }, replace: true });
          }, 2000);
        }
      }
  
      setLoading(false);
    };

    fetchActionLogs();
    
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [axiosPrivate, navigate, location]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "userRole", headerName: "Role", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    { field: "entity", headerName: "Entity", flex: 1 },
    { field: "statusCode", headerName: "Status", flex: 1 },
    { field: "timestamp", headerName: "Date", type: "date", flex: 1 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row.id)}
          sx={{
            backgroundColor: colors.redAccent[500],
            color: colors.grey[100],
            borderRadius: "4px",
          }}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/Action/DeleteLog/${id}`);

      setSuccess("Action log was deleted successfully!");

      setActionLogs(prev => prev.filter(log => log.id !== id));

    } catch (err) {
      if (!err?.response)
      {
        setError("No Server Response! Try Again Later."); 
      } else if (err.response?.status === 400)
      {
        setError("Somethign went wrong!");
      } else if (err.response?.status === 401)
      {
        setError("UnAutherized, Please Login!");

        setTimeout(() => {
          navigate('/login', { state: { from: location }, replace: true });
        }, 2000);

      } else {
        setError("Deleting Log Failed, Maybe Try to ReLogin.");

        setTimeout(() => {
          navigate('/login', { state: { from: location }, replace: true });
        }, 2000);
      }
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
      
      {error && Array.isArray(error) && error.map((errMsg, index) => (
        <Alert key={index} severity="error" sx={{ marginBottom: '50px' }}>
          {errMsg}
        </Alert>
      ))}
      
      {success && <Alert severity="success" sx={{ marginBottom: '50px' }}>{success}</Alert>}

      {/* Stats & Logs */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          "& .MuiBox-root.css-1yg19ie": {
            display: "none !important",
          },
        }}
      >
        {/* ROW 1 (Stats) */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="موظفين"
            link=""
            icon={
              <ManageAccountsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="عملاء"
            link=""
            icon={
              <PeopleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="منتجات"
            link=""
            icon={
              <ProductionQuantityLimits
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 (Logs) */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
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
              direction: "ltr",
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
          <DataGrid
            rows={actionLogs}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
