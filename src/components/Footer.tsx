
import {
  Box,
  Container,
  Link as MuiLink,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import "../styles/footer.scss";

function Footer() {
  return (
    <Box component="footer" className="shop-footer">
      <Container maxWidth="xl">
        <Box className="footer-content">
          <Box className="footer-about">
            <Typography variant="h6" className="footer-logo">
              ShopEase
            </Typography>

            <Typography variant="body2">
              Discover everyday essentials, stylish accessories,
              and products you'll love.
            </Typography>
          </Box>

          <Box className="footer-links">
            {/* <Typography variant="subtitle1" fontWeight={700}>
              Quick Links
            </Typography> */}

            <MuiLink component={Link} to="/" underline="hover">
              Home
            </MuiLink>

            <MuiLink component={Link} to="/cart" underline="hover">
              Shopping Cart
            </MuiLink>
          </Box>

          <Box className="footer-contact">
            {/* <Typography variant="subtitle1" fontWeight={700}>
              Customer Support
            </Typography> */}

            <Typography variant="body2">
              Need help with your shopping?
            </Typography>

            <Typography variant="body2">
              Email: support@example.com
            </Typography>
          </Box>
        </Box>

        <Box className="footer-bottom">
          <Typography variant="body2">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;