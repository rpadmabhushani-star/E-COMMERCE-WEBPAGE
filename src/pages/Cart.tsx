
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";

import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../redux/hooks";

import "../styles/cart.scss"

function Cart() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <Container maxWidth="lg">
          <Box className="empty-cart">
            <ShoppingBagOutlinedIcon className="empty-cart-icon" />

            <Typography variant="h4">
              Your Cart Is Empty
            </Typography>

            <Typography className="empty-cart-description">
              Looks like you haven't added anything to your cart yet.
              Explore our products and find something you love.
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<ArrowBackIcon />}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <Container maxWidth="lg">
        <Box className="cart-heading">
          <Typography variant="h4" className="cart-title">
            Shopping Cart
          </Typography>

          <Typography className="cart-item-count">
            {totalQuantity} item(s) in your cart
          </Typography>
        </Box>

        <Box className="cart-layout">
          <Box className="cart-items-section">
            {cartItems.map((item) => (
              <Box
                className="cart-item"
                key={item.product.id}
              >
                <Link
                  to={`/product/${item.product.id}`}
                  className="cart-product-image"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </Link>

                <Box className="cart-product-info">
                  <Typography
                    component={Link}
                    to={`/product/${item.product.id}`}
                    className="cart-product-name"
                  >
                    {item.product.name}
                  </Typography>

                  <Typography className="cart-product-price">
                    {formatPrice(item.product.price)}
                  </Typography>

                  <Typography className="cart-subtotal">
                    Subtotal:{" "}
                    {formatPrice(
                      item.product.price * item.quantity
                    )}
                  </Typography>

                  <Box className="quantity-controls">
                    <IconButton
                      size="small"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.product.id)
                        )
                      }
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography className="quantity-value">
                      {item.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      aria-label={`Increase quantity of ${item.product.name}`}
                      onClick={() =>
                        dispatch(
                          increaseQuantity(item.product.id)
                        )
                      }
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <IconButton
                  className="remove-cart-item"
                  aria-label={`Remove ${item.product.name} from cart`}
                  onClick={() =>
                    dispatch(removeFromCart(item.product.id))
                  }
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            ))}

            <Box className="cart-actions">
              <Button
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
                className="continue-shopping"
              >
                Continue Shopping
              </Button>

              <Button
                color="error"
                onClick={() => dispatch(clearCart())}
                startIcon={<DeleteOutlinedIcon />}
                className="clear-cart-button"
              >
                Clear Cart
              </Button>
            </Box>
          </Box>

          <Box className="order-summary">
            <Typography variant="h6" className="summary-title">
              Order Summary
            </Typography>

            <Divider />

            <Box className="summary-row">
              <Typography>Items ({totalQuantity})</Typography>
              <Typography>{formatPrice(totalAmount)}</Typography>
            </Box>

            <Box className="summary-row">
              <Typography>Delivery</Typography>
              <Typography className="free-delivery">
                FREE
              </Typography>
            </Box>

            <Divider />

            <Box className="summary-row summary-total">
              <Typography>Total Amount</Typography>
              <Typography>{formatPrice(totalAmount)}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              className="checkout-button"
              onClick={() =>
                window.alert(
                  "Checkout functionality will be added in a future step."
                )
              }
            >
              Proceed to Checkout
            </Button>

            <Typography className="checkout-note">
              Your total updates automatically when you change
              product quantities.
            </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  );
}

export default Cart;
