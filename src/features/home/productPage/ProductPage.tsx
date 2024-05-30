import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  Button,
  Backdrop,
  CircularProgress,
  IconButton,
  ButtonGroup,
  Snackbar,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addToCartRequest, authState, getProductById } from "../slices/slices";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactImageMagnify from "react-image-magnify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: any }>();
  const { productById, isLoading, error } = useSelector(authState);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isViewingLargeImage, setIsViewingLargeImage] =
    useState<boolean>(false);
  const [addCartValue, setAddCartValue] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productById?.product?.images?.length) {
      setSelectedImage(productById.product.images[0]);
    }
  }, [productById]);

  function handleMinus() {
    setAddCartValue(addCartValue - 1);
  }

  function handlePlus() {
    setAddCartValue(addCartValue + 1);
  }

  function handleAddToCart() {
    const addToCartData = {
      products: {
        product: productId,
        price: product.price,
        quantity: addCartValue,
      },
    };
    dispatch(addToCartRequest(addToCartData));
    if (error === null) {
      setShowSnackbar(true);
      setSnackbarMessage("Product added to cart successfully!");
    } else {
      setShowSnackbar(true);
      setSnackbarMessage("Failed to add product to cart. Please try again.");
    }
  }

  if (!productById) {
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

  const product = productById.product;
  const productImages = product.images || [];

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <Box sx={{ width: "100%", p: 0 }}>
      <Box mt={2}>
        <IconButton color="inherit" component={Link} to="/" sx={{ m: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Grid container spacing={4}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={1}>
              <Box>
                {productImages.map((image: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      cursor: "pointer",
                      border:
                        selectedImage === image
                          ? "2px solid #ff3d47"
                          : "2px solid transparent",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={() => setSelectedImage(image)}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index}`}
                      style={{
                        width: "20px",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              {selectedImage && (
                <Box
                  onMouseEnter={() => setIsViewingLargeImage(true)}
                  onMouseLeave={() => setIsViewingLargeImage(false)}
                >
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Product Image",
                        isFluidWidth: true,
                        src: selectedImage,
                      },
                      largeImage: {
                        src: selectedImage,
                        width: 1200,
                        height: 1800,
                      },
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                {!isViewingLargeImage && (
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h4">{product.name}</Typography>
                        <StyledRating name="read-only" value={4} readOnly />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Price: <CurrencyRupeeIcon />
                    {product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through" }}
                  >
                    M.R.P.: <CurrencyRupeeIcon />
                    {product.mrp}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Inclusive of all taxes
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2">
                      Available Colour: {product.color}
                    </Typography>
                  </Box>
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button onClick={handleMinus}>
                      <RemoveIcon />
                    </Button>
                    <Button>{addCartValue}</Button>
                    <Button onClick={handlePlus}>
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                  <Box mt={2}>
                    <Button variant="contained" color="primary">
                      Buy Now
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleAddToCart}
                      sx={{ ml: 2 }}
                      startIcon={<AddShoppingCartIcon />}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProductPage;
