
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { Link, NavLink } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

import "../styles/header.scss";

function Header() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AppBar position="sticky" className="shop-header" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar className="shop-toolbar" disableGutters>
          <Typography
            component={Link}
            to="/"
            className="shop-logo"
            sx={{ textDecoration: "none" }}
          >
            <StorefrontIcon />
            <span>ShopEase</span>
          </Typography>

          <Box className="header-navigation">
            <Button
              component={NavLink}
              to="/"
              className="header-link"
              color="inherit"
            >
              Home
            </Button>

            <Button
              component={NavLink}
              to="/cart"
              className="header-cart"
              color="inherit"
              aria-label={`Shopping cart, ${totalQuantity} items`}
            >
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>

              <span>Cart</span>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;