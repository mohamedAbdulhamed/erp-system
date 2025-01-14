import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { tokens } from "../../theme";

import useAuth from '../../hooks/useAuth';

import Copyright from '../../components/Copyright.tsx';
import Footer from '../../components/Layout/Footer.tsx';

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
      }}
    >
      <AppBar position="static" sx={{ bgcolor: colors.primary[500] }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: colors.grey[100] }}>
            الرئيسية
          </Typography>
          <Button color="inherit" href={auth?.user ? "/dashboard" : "/login"} sx={{ color: colors.grey[100] }}>
            {auth?.user ? "الي لوحة التحكم" : "تسجيل دخول"}
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          backgroundImage: 'url(https://source.unsplash.com/random)', // TODO: Change to more specific
          backgroundSize: 'cover',
          color: colors.grey[100],
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          اهلا بيك في برنامج الادارة
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          تقدر تتحكم في النظام الخاص بمكانك كاملا
        </Typography>
        <Button variant="contained" sx={{ bgcolor: colors.redAccent[500], color: colors.grey[100] }} href={auth?.user ? "/dashboard" : "/login"}>
          {auth?.user ? "انتقل الي لوحة التحكم" : "اضغط للبدأ"}
        </Button>
      </Box>

      <Box sx={{ bgcolor: colors.grey[900], p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom sx={{ color: colors.grey[100] }}>
          برنامج الادارة
        </Typography>
        <Typography variant="subtitle1" align="center" color={colors.grey[500]} component="p">
          تحكم في كل شئ واكثر
        </Typography>
        <Copyright sx={{ color: colors.grey[100] }} name="برنامج الادارة" link='' />
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Home;
