import { Typography, Paper, Container, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";

const DeviceView = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [device, setDevice] = useState(null);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [selectedClientId, setSelectedClientId] = useState('');



  useEffect(() => {
    let isMountedDevice = true;
    let isMountedClients = true;
    const deviceController = new AbortController();
    const clientsontroller = new AbortController();

    const fetchDevice = async () => {
      setError(null);
      setSuccess(null);

      try {
        const response = await axiosPrivate.get(`/Device/GetById/${id}`, { signal: deviceController.signal });
  
        isMountedDevice && setDevice(response.data);
  
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
          setError("Fetching Device Failed, Maybe Try to ReLogin.");

          setTimeout(() => {
            navigate('/login', { state: { from: location }, replace: true });
          }, 2000);
        }
      }
    };
  
    const fetchClients = async () => {
      setError(null);
      setSuccess(null);
      
      try {
        const response = await axiosPrivate.get("/Client/GetAll", { signal: clientsontroller.signal });

        const data = response.data.map(client => ({
          ...client,
          createdAt: new Date(client.createdAt + "T12:00:00"),
          updatedAt: new Date(client.updatedAt + "T12:00:00"),
        }));
  
        isMountedClients && setClients(data);
  
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
          setError("Fetching Clients Failed, Maybe Try to ReLogin.");

          setTimeout(() => {
            navigate('/login', { state: { from: location }, replace: true });
          }, 2000);
        }
      }
    };

    fetchDevice();
    fetchClients();

    
    return () => {
      isMountedClients = false;
      isMountedDevice = false;
      deviceController.abort();
      clientsontroller.abort();
    }
  }, [id, axiosPrivate, location, navigate]);

  const toggleStatus = async () => {
    if (!device) return;

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await axiosPrivate.get(`/Device/ToggleStatus/${id}`);

      setSuccess("Status Changed");

      // reload
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
        setError("Toggle Status Failed, Maybe Try to ReLogin.");

        setTimeout(() => {
          navigate('/login', { state: { from: location }, replace: true });
        }, 2000);
      }
    }

    setLoading(false);
  };

  const handleAssignClient = async () => {
    if (!selectedClientId) return;
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await axiosPrivate.post(`/Device/Assign/${id}`, selectedClientId);

      //reload 

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
        setError("Assign Failed, Maybe Try to ReLogin.");

        setTimeout(() => {
          navigate('/login', { state: { from: location }, replace: true });
        }, 2000);
      }
    }

    setLoading(false);
  };

  const handleUnassignClient = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await axiosPrivate.post(`/Device/Unassign/${id}`);

      // reload
      
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
        setError("Unassing Failed, Maybe Try to ReLogin.");

        setTimeout(() => {
          navigate('/login', { state: { from: location }, replace: true });
        }, 2000);
      }
    }

    setLoading(false);
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
    <Container sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: '50px' }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: '50px' }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Device Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Serial No.: {device?.serialNo}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Name: {device?.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Status: {device?.status === 1 ? "On" : "Off"}
          <Button
            variant="contained"
            onClick={toggleStatus}
            sx={{ ml: 2, backgroundColor: device?.status === 1 ? colors.redAccent[500] : colors.greenAccent[500] }}
          >
            Toggle Status
          </Button>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Type: {device?.type.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Created By: <Link to={`/user/${device?.createdBy}`} style={{ color: colors.blueAccent[500] }}>{device?.createdBy}</Link>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Assigned Client: 
            {device?.clientId ? (
              <>
                <Link to={`/client/${device?.clientId}`} style={{ color: colors.blueAccent[500] }}>
                  {device?.clientId}
                </Link>
                <Button
                  variant="contained"
                  onClick={handleUnassignClient}
                  sx={{ ml: 2, backgroundColor: colors.redAccent[500] }}
                >
                  Unassign
                </Button>
              </>
            ) : (
              <>
                No assigned client yet
              </>
            )}
          </Typography>
          {!device?.clientId && (
            <Box sx={{ mt: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="select-client-label">Select Client</InputLabel>
                <Select
                  labelId="select-client-label"
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  label="Select Client"
                >
                  {clients?.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleAssignClient}
                sx={{ ml: 2, mt: 2, backgroundColor: colors.primary[500] }}
              >
                Assign Client
              </Button>
            </Box>
          )}
        </Box>
        <Typography variant="body1" gutterBottom>
          Created At: {new Date(device?.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Updated At: {new Date(device?.updatedAt).toLocaleDateString()}
        </Typography>
      </Paper>
    </Container>
  );
};

export default DeviceView;
