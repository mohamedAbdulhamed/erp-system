import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Notification.permission === "granted") {
      setNotificationsAllowed(true);
    }
  }, []);

  const handleNotificationClick = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsAllowed(true);
        }
      });
    } else if (Notification.permission === "granted") {
      setNotificationsAllowed(true);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        p="10px"
      >
        <Typography variant="h3" color={colors.grey[100]}>
          برنامج الادارة
        </Typography>
      </Box>

      {/* Theme */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {/* Notification */}
        <IconButton onClick={handleNotificationClick}>
          {notificationsAllowed ? (
            <NotificationsActiveIcon />
          ) : (
            <NotificationsOutlinedIcon />
          )}
        </IconButton>

        {/* Profile */}
        <IconButton  onClick={() => navigate("/profile")}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
