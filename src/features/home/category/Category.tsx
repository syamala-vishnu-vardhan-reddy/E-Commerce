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
      <Box mt={4}></Box>
    </Box>
  );
};

export default CategoryComponent;
