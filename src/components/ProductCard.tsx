import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import type { Product } from "../types/product";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";

import "../styles/productCard.scss";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const isOutOfStock = product.availability === "Out of Stock";

  return (
    <Card className="product-card">
      <Box
        component={Link}
        to={`/product/${product.id}`}
        className="product-card-link"
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          className="product-card-image"
        />

        <CardContent>
          <Typography variant="h6">
            {product.name}
          </Typography>

          <Typography variant="body2">
            {product.description}
          </Typography>

          <Typography variant="h6" color="primary">
            ₹{product.price.toLocaleString("en-IN")}
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartOutlinedIcon />}
          disabled={isOutOfStock}
          onClick={() => dispatch(addToCart(product))}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Box>

      
    </Card>
  );
}

export default ProductCard;

