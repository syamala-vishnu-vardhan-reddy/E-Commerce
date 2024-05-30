import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { authState, searchProducts, addToCartRequest } from "../slices/slices";
import { useNavigate, useParams } from "react-router-dom";

const SearchResultsPage: React.FC = () => {
  const { searchQuery } = useParams<{ searchQuery: any }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults } = useSelector(authState);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchProducts(searchQuery));
    }
  }, [dispatch, searchQuery]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId: string, price: number) => {
    const addToCartData = {
      products: {
        product: productId,
        price: price,
        quantity: 1,
      },
    };
    dispatch(addToCartRequest(addToCartData));
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Extract the products array from searchResults
  const products = searchResults?.products || [];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{searchQuery}"
        </Typography>
        {products.length > 0 ? (
          <Grid container spacing={2}>
            {products.map((product: any) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card
                  onClick={() => handleProductClick(product._id)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundImage: `url(${product.thumbnail})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {truncateText(product.name, 50)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mt: 2, display: "flex", alignItems: "center" }}
                    >
                      Price: <CurrencyRupeeIcon fontSize="small" />
                      {product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      MRP: <CurrencyRupeeIcon fontSize="small" />
                      {product.mrp}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id, product.price);
                      }}
                      style={{ marginTop: "10px" }}
                    >
                      <AddShoppingCartIcon fontSize="small" /> Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No products found</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchResultsPage;
