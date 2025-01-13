import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/shared/Topbar";
import SidebarComponent from "./scenes/shared/Sidebar";

import Login from "./scenes/auth/login";
import Home from "./scenes/shared/home";
import Dashboard from "./scenes/dashboard";

import Emps from "./scenes/emps";
import ViewEmp from "./scenes/emps/view";
import NewEmp from "./scenes/emps/new";

import Clients from "./scenes/clients";
import ViewClient from "./scenes/clients/view";
import AddClient from "./scenes/clients/new";

import Products from "./scenes/products";
import ViewProduct from "./scenes/products/view";
import NewProduct from "./scenes/products/new";

import NewCategory from "./scenes/products/categories/new";

import Suppliers from "./scenes/suppliers";
import ViewSupplier from "./scenes/suppliers/view";
import NewSupplier from "./scenes/suppliers/new";

import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import { ROLES } from './config/constants.ts';

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ direction: "rtl" }}>
          <SidebarComponent isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

              <Route element={<PersistLogin />}>
                {/* Private Routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.accountant]} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/emps" element={<Emps />} />
                  <Route path="/emp/:id" element={<ViewEmp />} />
                  <Route path="/emp/new" element={<NewEmp />} />

                  <Route path="/clients" element={<Clients />} />
                  <Route path="/client/:id" element={<ViewClient />} />
                  <Route path="/client/new" element={<AddClient />} />

                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ViewProduct />} />
                  <Route path="/product/new" element={<NewProduct />} />

                  <Route path="/product/categories/new" element={<NewCategory />} />

                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/suppliers/:id" element={<ViewSupplier />} />
                  <Route path="/supplier/new" element={<NewSupplier />} />
                </Route>
              </Route>

              {/* 404 */}
              {/* <Route path="*" element={<NotFound />}></Route> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
