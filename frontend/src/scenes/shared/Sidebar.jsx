import { Fragment, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PeopleIcon from "@mui/icons-material/People";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RouterIcon from "@mui/icons-material/Router";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";

import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import BadgeIcon from '@mui/icons-material/Badge';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import GroupAddIcon from '@mui/icons-material/GroupAdd';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { auth } = useAuth();
  const logout = useLogout();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        {!isCollapsed && <Typography>{title}</Typography>}
        <Link to={to} />
      </MenuItem>
    );
  };

  return (
    <Box
      sx={{
        direction: "ltr",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}></Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {auth?.user && (
            <Fragment>
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {isCollapsed ? undefined : (
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`../../assets/user.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  )}
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {auth?.user?.fullName}
                  </Typography>
                    <Typography variant="h5" color={colors.greenAccent[500]}>
                        <span>
                          {auth.user?.role}
                        </span>
                    </Typography>
                </Box>
              </Box>

              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="لوحة التحكم"
                  to="/dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  منتجات
                </Typography>
                <Item
                  title="ادارة المنتجات"
                  to="/products"
                  icon={<InventoryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="اضافة منتج جديد"
                  to="/product/new"
                  icon={<AddShoppingCartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="اضافة فئة جديدة"
                  to="/product/categories/new"
                  icon={<CategoryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  موظفين
                </Typography>
                <Item
                  title="ادارة موظفين"
                  to="/emps"
                  icon={<BadgeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="تسجيل موظف جديد"
                  to="/emp/new"
                  icon={<PersonAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  عملاء
                </Typography>
                <Item
                  title="متابعة العملاء"
                  to="/clients"
                  icon={<PeopleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="اضافة عميل"
                  to="/client/new"
                  icon={<GroupAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  موردين
                </Typography>
                <Item
                  title="ادارة الموردين"
                  to="/suppliers"
                  icon={<LocalShippingIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="اضافة مورد"
                  to="/supplier/new"
                  icon={<AddCircleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Fragment>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              محتاج مساعدة
            </Typography>
            <Item
              title="اسألة مشهورة"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {auth?.user && (
              <MenuItem
                onClick={handleLogout}
                icon={<ExitToAppIcon />}
                style={{
                  margin: "15px 0 5px 20px",
                  color: colors.redAccent[500],
                }}
              >
                <Typography>تسجيل خروج</Typography>
              </MenuItem>
            )}

            {!auth?.user && (
              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Typography display={isCollapsed ? "none" : "block"}>
                  سجل دخولك عشان تقدر تستخدم البرنامج
                </Typography>
                <Item
                  title="تسجيل الدخول"
                  to="/login"
                  icon={<LoginIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
