import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  ButtonGroup,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchCartSummary,
  authState,
  deleteCartRequest,
  addToCartRequest,
} from "../slices/slices";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const CartSummary: React.FC = () => {
  const dispatch = useDispatch();
  const { cartSummary, isLoading, error } = useSelector(authState);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalMRP, setTotalMRP] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const shipping = "FREE";

  useEffect(() => {
    dispatch(fetchCartSummary());
  }, [dispatch]);

  useEffect(() => {
    if (cartSummary) {
      const total = cartSummary.cart.products.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );
      const mrp = cartSummary.cart.products.reduce(
        (acc: number, item: any) => acc + item.product.mrp * item.quantity,
        0
      );

      setTotalAmount(total);
      setTotalMRP(mrp);

      const discountAmount = mrp - total;
      setDiscount(discountAmount);
    }
  }, [cartSummary]);

  const handleDecrement = (productId: string, price: any, quantity: any) => {
    const addToCartData = {
      products: {
        product: productId,
        price: price,
        quantity: quantity - 1,
      },
    };
    dispatch(addToCartRequest(addToCartData));
    dispatch(fetchCartSummary());
  };

  const handleIncrement = (productId: string, price: any, quantity: any) => {
    const addToCartData = {
      products: {
        product: productId,
        price: price,
        quantity: quantity + 1,
      },
    };
    dispatch(addToCartRequest(addToCartData));
    dispatch(fetchCartSummary());
  };

  const handleDelete = (productId: string) => {
    dispatch(deleteCartRequest({ productId: productId }));
    dispatch(fetchCartSummary());
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error">Error: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Shopping Cart</Typography>

      <Grid container spacing={1}>
        <Grid item xs={12} md={7}>
          {cartSummary?.cart?.products?.map((item: any) => (
            <Card
              key={item?.product?._id}
              sx={{
                marginBottom: 2,
                position: "relative",
                borderRadius: 2,
                borderColor: "primary.main",
              }}
              variant="outlined"
            >
              <Divider sx={{ marginY: 2 }} />
              <CardContent>
                <IconButton
                  sx={{ position: "absolute", top: 6, right: 6 }}
                  color="error"
                  aria-label="delete"
                  onClick={() => handleDelete(item?.product?._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Link to={`/product/${item.product._id}`}>
                      <Box
                        component="img"
                        src={item?.product?.thumbnail}
                        alt={item?.product?.name}
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 1,
                          boxShadow: 1,
                        }}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">{item?.product?.name}</Typography>
                    <Typography color="text.secondary">
                      Price: ${item?.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: "right" }}>
                    <ButtonGroup>
                      <Button
                        onClick={() =>
                          handleDecrement(
                            item?.product?._id,
                            item?.price,
                            item?.quantity
                          )
                        }
                        disabled={item?.quantity === 1}
                      >
                        <RemoveIcon />
                      </Button>
                      <Button>{item?.quantity}</Button>
                      <Button
                        onClick={() =>
                          handleIncrement(
                            item?.product?._id,
                            item?.price,
                            item?.quantity
                          )
                        }
                      >
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom>
            Order Summary
          </Typography>
          <Box
            component={Paper}
            sx={{ padding: 2, borderRadius: 2, borderColor: "primary.main" }}
            variant="outlined"
          >
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Item Total ({cartSummary?.cart?.products?.length})
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        ${totalAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Discount</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        -${discount.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Shipping</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{shipping}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Total
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" fontWeight="bold">
                        ${totalAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Divider sx={{ marginY: 2 }} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartCheckoutIcon />}
              fullWidth
              size="large"
            >
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartSummary;
