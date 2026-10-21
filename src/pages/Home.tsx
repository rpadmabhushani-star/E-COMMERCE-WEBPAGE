import { useMemo, useState } from "react"

import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"

import ProductCard from "../components/ProductCard"
import productsData from "../data/products.json"
import type { Product } from "../types/product"

import "../styles/home.scss";

const products: Product[] = productsData;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    );
  }, [searchTerm]);

  return (
    <main className="home-page">
      <Container maxWidth="xl">
        <Box className="home-banner">
          <Typography variant="overline" className="banner-label">
            WELCOME TO SHOPEASE
          </Typography>

          <Typography variant="h3" className="banner-title">
            Find Your Everyday Essentials
          </Typography>

          <Typography variant="body1" className="banner-description">
            Explore our collection of products at great prices.
            Discover something you will love!
          </Typography>
        </Box>

        <Box className="products-section">
          <Box className="products-heading">
            <Box>
              <Typography variant="h4" className="section-title">
                All Products
              </Typography>

              <Typography variant="body2" className="product-count">
                {filteredProducts.length} products found
              </Typography>
            </Box>

            <TextField
              className="product-search"
              placeholder="Search products..."
              size="small"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />  
          </Box>

          {filteredProducts.length > 0 ? (
            <Box className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product ={product}
                />
              ))}
            </Box>
          ) : (
            <Box className="no-products">
              <Typography variant="h6">
                No products found
              </Typography>

              <Typography variant="body2">
                Try searching with a different product name.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </main>
  );
}

export default Home;