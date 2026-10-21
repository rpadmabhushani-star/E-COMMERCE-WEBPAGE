
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Rating,
  Typography,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import productsData from "../data/products.json";
import type { Product } from "../types/product";

import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

import "../styles/productDetails.scss";

const products: Product[] = productsData;

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const product = useMemo(
    () => products.find((item) => item.id === id),
    [id]
  );

  if (!product) {
    return (
      <Container maxWidth="md">
        <Box className="product-not-found">
          <Typography variant="h4">
            Product Not Found
          </Typography>

          <Typography>
            Sorry, we could not find this product.
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  const isOutOfStock =
    product.availability === "Out of Stock";

  const availabilityColor =
    product.availability === "Available"
      ? "success"
      : isOutOfStock
        ? "error"
        : "warning";

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <main className="product-details-page">
      <Container maxWidth="xl">
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          className="back-button"
        >
          Continue Shopping
        </Button>

        <Box className="product-details-layout">
          <Box className="product-details-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </Box>

          <Box className="product-details-info">
            <Typography
              variant="overline"
              className="details-label"
            >
              PRODUCT DETAILS
            </Typography>

            <Typography
              variant="h3"
              className="details-title"
            >
              {product.name}
            </Typography>

            <Box className="details-rating">
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
              />

              <Typography variant="body2">
                {product.rating.toFixed(1)} / 5
              </Typography>
            </Box>

            <Typography className="details-price">
              ₹{product.price.toLocaleString("en-IN")}
            </Typography>

            <Chip
              label={product.availability}
              color={availabilityColor}
              className="details-availability"
            />

            <Typography
              variant="h6"
              className="description-heading"
            >
              Product Description
            </Typography>

            <Typography className="details-description">
              {product.description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="details-add-button"
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            <Typography className="delivery-note">
              Secure shopping • Quality products • Easy browsing
            </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  );
}

export default ProductDetails;
