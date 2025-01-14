import { Typography, Paper, Container, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

import Alert from '@mui/material/Alert';
import Loading from "../../components/Loading";
import { handleError } from '../../utils/utils.ts';

const ViewProduct = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    sellingPrice: 0.0,
    purchasePrice: 0.0,
    quantity: 0,
    reorderLevel: 0,
    supplier: {},
    productCategory: {},
    factory: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [selectedClientId, setSelectedClientId] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProduct = async () => {
      setError(null);
      setSuccess(null);

      setLoading(true);

      try {
        const response = await axiosPrivate.get(`/Product/GetById/${id}`, { signal: controller.signal });
  
        isMounted && setProduct(response.data);
  
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
    
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [id, axiosPrivate, location, navigate]);

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
          Product Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Product Name: {product?.name}
        </Typography>
        {/* <Typography variant="body1" gutterBottom>
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
        </Box>*/}
        <Typography variant="body1" gutterBottom>
          Created At: {new Date(product?.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Updated At: {new Date(product?.updatedAt).toLocaleDateString()}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ViewProduct;
