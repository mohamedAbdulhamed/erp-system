import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Link
} from "@mui/material";
import { tokens } from "../../theme";
import Copyright from "../Copyright";
import { FOOTER_HEIGHT } from "../../config/constants";
import { Mail, Phone } from "@mui/icons-material";
import { LocationCity } from "@mui/icons-material";
import "../../styles/footer.css";

function Footer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <footer>
      <Box className="footer-category">
        <Container>
          <h2 className="footer-category-title">
            Brand directory
          </h2>

          <Box className="footer-category-box">
            <h3 className="category-box-title">
              Fashion :
            </h3>

            <Link href="#" className="footer-category-link">
              T-shirt  
            </Link>
            <Link href="#" className="footer-category-link">
              Shirts
            </Link>
            <Link href="#" className="footer-category-link">
              shorts & jeans
            </Link>
            <Link href="#" className="footer-category-link">
              jacket
            </Link>
            <Link href="#" className="footer-category-link">
              dress & frock
            </Link>
            <Link href="#" className="footer-category-link">
              innerwear
            </Link>
            <Link href="#" className="footer-category-link">
              hosiery
            </Link>
          </Box>

          <Box className="footer-category-box">
            <h3 className="category-box-title" >
              footwear :
            </h3>

            <Link href="#" className="footer-category-link">
              sport
            </Link>
            <Link href="#" className="footer-category-link">
              formal
            </Link>
            <Link href="#" className="footer-category-link">
              Boots
            </Link>
            <Link href="#" className="footer-category-link">
              casual
            </Link>
            <Link href="#" className="footer-category-link">
              cowboy shoes
            </Link>
            <Link href="#" className="footer-category-link">
              safety shoes
            </Link>
            <Link href="#" className="footer-category-link">
              Party wear shoes
            </Link>
            <Link href="#" className="footer-category-link">
              Branded
            </Link>
            <Link href="#" className="footer-category-link">
              Firstcopy
            </Link>
            <Link href="#" className="footer-category-link">
              Long shoes
            </Link>
          </Box>

          <Box className="footer-category-box">
            <h3 className="category-box-title">
              jewellery :
            </h3>

            <Link href="#" className="footer-category-link">
              Necklace
            </Link>
            <Link href="#" className="footer-category-link">
              Earrings
            </Link>
            <Link href="#" className="footer-category-link">
              Couple rings
            </Link>
            <Link href="#" className="footer-category-link">
              Pendants
            </Link>
            <Link href="#" className="footer-category-link">
              Crystal
            </Link>
            <Link href="#" className="footer-category-link">
              Bangles
            </Link>
            <Link href="#" className="footer-category-link">
              bracelets
            </Link>
            <Link href="#" className="footer-category-link">
              nosepin
            </Link>
            <Link href="#" className="footer-category-link">
              chain
            </Link>
            <Link href="#" className="footer-category-link">
              Earrings
            </Link>
            <Link href="#" className="footer-category-link">
              Couple rings
            </Link>
          </Box>

          <Box className="footer-category-box">
            <h3 className="category-box-title" >
              cosmetics :
            </h3>

            <Link href="#" className="footer-category-link">
              Shampoo
            </Link>
            <Link href="#" className="footer-category-link">
              Bodywash
            </Link>
            <Link href="#" className="footer-category-link">
              Facewash
            </Link>
            <Link href="#" className="footer-category-link">
              makeup kit
            </Link>
            <Link href="#" className="footer-category-link">
              liner
            </Link>
            <Link href="#" className="footer-category-link">
              lipstick
            </Link>
            <Link href="#" className="footer-category-link">
              prefume
            </Link>
            <Link href="#" className="footer-category-link">
              Body soap
            </Link>
            <Link href="#" className="footer-category-link">
              scrub
            </Link>
            <Link href="#" className="footer-category-link">
              hair gel
            </Link>
            <Link href="#" className="footer-category-link">
              hair colors
            </Link>
            <Link href="#" className="footer-category-link">
              liner
            </Link>
            <Link href="#" className="footer-category-link">
              lipstick
            </Link>
          </Box>
        </Container>
      </Box>

      <Box className="footer-nav">
        <Container
          sx={{
            display: "flex",
            flexDirection: isNonMobile ? "row" : "column",
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Popular Categories</h2>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Fashion
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Electronic
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Cosmetic
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Health
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Watches
                  </Link>
                </li>
              </ul>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Products</h2>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Prices drop
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    New products
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Best sales
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Contact us
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Our Company</h2>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Delivery
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Legal Notice
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Terms and conditions
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    About us
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Secure payment
                  </Link>
                </li>
              </ul>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Services</h2>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Prices drop
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    New products
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Best sales
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Contact us
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Contact</h2>
                </li>

                <li className="footer-nav-item flex">
                  <Box className="icon-box">
                    <LocationCity />
                  </Box>

                  <address className="content">
                    419 State 414 Rte Beaver Dams, New York(NY), 14812, USA
                  </address>
                </li>

                <li className="footer-nav-item flex">
                  <Box className="icon-box">
                    <Phone />
                  </Box>

                  <Link href="tel:+201099674909" className="footer-nav-link">
                    (+20) Our Phone Number
                  </Link>
                </li>

                <li className="footer-nav-item flex">
                  <Box className="icon-box">
                    <Mail />
                  </Box>

                  <Link
                    href="mailto:mohamed_abdulhamed_work@gmail.com"
                    className="footer-nav-link"
                  >
                    xrent@gmail.com
                  </Link>
                </li>
              </ul>
            </Grid>

          </Grid>
        </Container>
      </Box>

      <Box className="footer-bottom">
        <Container>
          <p className="copyright">
            Copyright &copy; <Link href="/">XRent</Link> {new Date().getFullYear()} all rights reserved.
          </p>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
