// Header.tsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Snackbar,
  Alert,
  Badge,
} from "@mui/material";
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  LocalGroceryStoreOutlined as LocalGroceryStoreOutlinedIcon,
  PersonOutline as ProfileIcon,
  CardGiftcardOutlined as RewardsIcon,
  FavoriteBorderOutlined as WishlistIcon,
  ReceiptLongOutlined as OrdersIcon,
  RedeemOutlined as GiftCardsIcon,
  SearchOutlined as SearchOutlinedIcon,
} from "@mui/icons-material";
import {
  authState,
  loginRequest,
  signupRequest,
  fetchCartSummary,
  getCategories, // Ensure this is imported
} from "../slices/slices";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { error, user, cartSummary, categories } = useSelector(authState); // Ensure categories are in authState
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartSummary());
    dispatch(getCategories()); // Fetch categories on load
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setSnackbarMessage("Login successful!");
      setSnackbarOpen(true);
      setLoginModalOpen(false);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLoginModalOpen(true);
    handleMenuClose();
  };

  const handleSignup = () => {
    setSignupModalOpen(true);
    handleMenuClose();
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    setLoginError("");
  };

  const handleSignupModalClose = () => {
    setSignupModalOpen(false);
    setSignupError("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLoginSubmit = () => {
    dispatch(loginRequest(loginData));
  };

  const handleSignupSubmit = () => {
    dispatch(signupRequest(signupData));
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function handleCart() {
    navigate(`/cartSummary`);
  }

  function handleVishnuButton() {
    navigate(`/`);
  }

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      console.log(searchQuery);
    }
  };

  const cartItemCount =
    cartSummary?.cart?.products?.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0
    ) || 0;

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#0274f0", color: "white" }}
    >
      <Toolbar>
        {" "}
        <IconButton onClick={handleVishnuButton}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <strong>Viscart</strong>
            <Typography variant="subtitle1" component="div" marginTop={-1}>
              Viscart Plus
            </Typography>
          </Typography>
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", ml: 2 }}>
          {categories &&
            categories.map(
              (
                category: any // Ensure categories is not null
              ) => (
                <Button
                  key={category._id}
                  color="inherit"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.name}
                </Button>
              )
            )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate(`/search/${searchQuery}`)}>
              <SearchOutlinedIcon
                style={{ color: "white", marginRight: "10px" }}
              />
            </IconButton>
            <InputBase
              placeholder="Search for Products, Brands and More"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "white",
                "&::placeholder": { color: "white" },
                width: "100%",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button color="inherit" onClick={handleMenuClick}>
            <AccountCircleOutlinedIcon />
            {isLoggedIn ? "My Account" : "Login"}
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {isLoggedIn ? (
              <>
                <MenuItem onClick={handleMenuClose}>
                  <ProfileIcon />
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <AccountCircleOutlinedIcon />
                  Vishnu Plus
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <OrdersIcon />
                  Orders
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <WishlistIcon />
                  Wishlist
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <RewardsIcon />
                  Rewards
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <GiftCardsIcon />
                  Gift Cards
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <GiftCardsIcon />
                  Log Out
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleSignup} style={{ color: "blue" }}>
                  New User? Sign Up
                </MenuItem>
                <MenuItem onClick={handleLogin}>
                  <AccountCircleOutlinedIcon />
                  Login
                </MenuItem>
              </>
            )}
          </Menu>

          <Button color="inherit" onClick={handleCart}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <LocalGroceryStoreOutlinedIcon />
            </Badge>
            Cart
          </Button>
        </Box>
      </Toolbar>

      {/* Login Modal */}
      <Modal
        open={loginModalOpen}
        onClose={handleLoginModalClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="login-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Login
          </Typography>
          <TextField
            id="email"
            label="Email"
            fullWidth
            margin="normal"
            value={loginData.email}
            onChange={handleLoginInputChange}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={loginData.password}
            onChange={handleLoginInputChange}
          />
          {loginError && (
            <Typography color="error" variant="body2">
              {loginError}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginSubmit}
            style={{ marginTop: "16px" }}
          >
            Login
          </Button>
        </Box>
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        open={signupModalOpen}
        onClose={handleSignupModalClose}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="signup-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Sign Up
          </Typography>
          <TextField
            id="userName"
            label="Name"
            fullWidth
            margin="normal"
            value={signupData.userName}
            onChange={handleSignupInputChange}
          />
          <TextField
            id="email"
            label="Email"
            fullWidth
            margin="normal"
            value={signupData.email}
            onChange={handleSignupInputChange}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={signupData.password}
            onChange={handleSignupInputChange}
          />
          {signupError && (
            <Typography color="error" variant="body2">
              {signupError}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignupSubmit}
            style={{ marginTop: "16px" }}
          >
            Sign Up
          </Button>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
