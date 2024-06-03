import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  authState,
  getCategories,
  getProducts,
  addToCartRequest,
} from "../slices/slices";

const HideScrollbarGrid = styled(Grid)({
  display: "flex",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
});

const StyledCard = styled(Card)({
  transition: "transform 0.5s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:hover .add-to-cart-btn": {
    display: "block",
  },
});

const CategoryComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, products, isLoading } = useSelector(authState);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  const handleProductClick = (productId: any) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId: any, price: number) => {
    const addToCartData = {
      products: {
        product: productId,
        price: price,
        quantity: 1,
      },
    };
    dispatch(addToCartRequest(addToCartData));
  };

  return (
    <Box sx={{ width: "97%", marginLeft: 5 }}>
      <Box mt={4}>
        <Grid container spacing={4} direction="column">
          {categories && categories.length > 0 ? (
            categories.map((category: any) => (
              <React.Fragment key={category._id}>
                <Typography variant="h4" align="left" gutterBottom>
                  <Chip label={"Best of " + category.name} color="primary" />
                </Typography>
                <HideScrollbarGrid container spacing={2} wrap="nowrap">
                  {products && products.length > 0 ? (
                    products
                      .filter((product: any) => {
                        if (product.categoryId === category._id) return true;
                        if (category.children) {
                          return category.children.some(
                            (child: any) =>
                              product?.category?.parentId === child._id
                          );
                        }
                        return false;
                      })
                      .map((product: any) => (
                        <Grid
                          item
                          key={product.id}
                          xs={12}
                          sm={6}
                          md={4}
                          sx={{ minWidth: 300 }}
                          style={{ cursor: "pointer" }}
                        >
                          <StyledCard
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                            onClick={() => handleProductClick(product._id)}
                          >
                            <CardMedia
                              component="div"
                              sx={{
                                height: 200,
                                backgroundImage: `url(${product.thumbnail})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                position: "relative",
                              }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {product.name}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  mt: 2,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                Price:
                                <CurrencyRupeeIcon fontSize="small" />
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
                                Mrp:
                                <CurrencyRupeeIcon fontSize="small" />
                                {product.mrp}
                              </Typography>
                              <Button
                                className="add-to-cart-btn"
                                sx={{
                                  display: "none",
                                  mt: 2,
                                }}
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product._id, product.price);
                                }}
                              >
                                <AddShoppingCartIcon fontSize="small" />
                                Add to Cart
                              </Button>
                            </CardContent>
                          </StyledCard>
                        </Grid>
                      ))
                  ) : (
                    <Typography></Typography>
                  )}
                </HideScrollbarGrid>
              </React.Fragment>
            ))
          ) : (
            <Typography></Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryComponent;
