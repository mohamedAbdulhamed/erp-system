import React, { useState, useEffect } from 'react';
import { Typography, Paper, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";

const ClientView = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();


  const [client, setClient] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const controller = new AbortController();

    const fetchClient = async () => {
      setError(null);
      
      try {
        const response = await axiosPrivate.get(`/Client/GetById/${id}`);

        isMounted && setClient(response?.data);

      } catch (err) {
        if (!err?.response)
          {
            setError("No Server Response, Please Try Again Later!"); 
          } else if (err.response?.status === 400)
          {
            setError("Something Went Wrong, Please Validate The Request!")
          } else if (err.response?.status === 401)
          {
            setError("UnAutherized, Please Login!");

            setTimeout(() => {
              navigate('/login', { state: { from: location }, replace: true });
            }, 2000);

          } else {
            setError("Fetching User Failed, Maybe Try ReLogin!");

            setTimeout(() => {
              navigate('/login', { state: { from: location }, replace: true });
            }, 2000);
          }
      }

      setLoading(false);
    };

    fetchClient();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [id, location, navigate, axiosPrivate]);

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
    <Container sx={{ mt: 4 }}>
            
      {error && Array.isArray(error) && error.map((errMsg, index) => (
        <Alert key={index} severity="error" sx={{ marginBottom: '50px' }}>
          {errMsg}
        </Alert>
      ))}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: colors.primary[500] }}>
          Client Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Name: {client.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          National ID: {client.nationalId}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Latitude: {client.latitude}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Longitude: {client.longitude}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Created By: <Link to={`/user/${client.createdBy}`} style={{ color: colors.blueAccent[500] }}>{client.createdBy}</Link>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Created At: {new Date(client.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Updated At: {new Date(client.updatedAt).toLocaleDateString()}
        </Typography>

        {client.devices && client.devices.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Devices
            </Typography>
            {client.devices.map((device) => (
              <Paper key={device.id} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Device Name: {device.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Serial Number: {device.serialNo}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {device.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Created At: {new Date(device.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Updated At: {new Date(device.updatedAt).toLocaleDateString()}
                </Typography>
              </Paper>
            ))}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ClientView;
