import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ProfileIcon from '@mui/icons-material/PersonOutline';
import RewardsIcon from '@mui/icons-material/CardGiftcardOutlined';
import WishlistIcon from '@mui/icons-material/FavoriteBorderOutlined';
import OrdersIcon from '@mui/icons-material/ReceiptLongOutlined';
import GiftCardsIcon from '@mui/icons-material/RedeemOutlined';
import { IconButton, Box, InputBase, Menu, MenuItem, Modal, TextField, Snackbar, Alert } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from '../slices/slices';
import AuthService from '../services/services';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ userName: '', email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const baseURL = 'http://localhost:5000'; // Adjust this according to your environment
  const authService = new AuthService(baseURL);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLoginModalOpen(true);
    handleClose();
  };

  const handleSignup = () => {
    setSignupModalOpen(true);
    handleClose();
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    setLoginError('');
  };

  const handleSignupModalClose = () => {
    setSignupModalOpen(false);
    setSignupError('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLoginSubmit = () => {
    authService.login(loginData)
      .then((data) => {
        dispatch(loginSuccess(data));
        setIsLoggedIn(true);
        setLoginModalOpen(false);
        setSnackbarMessage('You have logged in successfully');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
        setLoginError(error.message);
      });
  };

  const handleSignupSubmit = () => {
    authService.signup(signupData)
      .then((data) => {
        dispatch(signupSuccess(data));
        setSignupModalOpen(false);
        setLoginModalOpen(true);
        setSnackbarMessage('Signup successful! Please log in.');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        dispatch(signupFailure(error.message));
        setSignupError(error.message);
      });
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

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#2874f0', color: 'white' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div">
            <strong>Vishnu</strong>
            <Typography variant="subtitle1" component="div" marginTop={-1}>
              Vishnu Plus
            </Typography>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '50%' }}>
            <SearchOutlinedIcon style={{ color: 'white', marginRight: '10px' }} />
            <InputBase
              placeholder="Search for Products, Brands and More"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: 'white', '&::placeholder': { color: 'white' }, width: '100%' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn ? (
            <Button color="inherit">
              <AccountCircleOutlinedIcon />
              My Account
            </Button>
          ) : (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onMouseOver={handleClick}
              style={{ color: 'white' }}
            >
              <AccountCircleOutlinedIcon />
              Login
            </Button>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isLoggedIn ? (
              <>
                <MenuItem>
                  <ProfileIcon />
                  My Profile
                </MenuItem>
                <MenuItem>
                  <AccountCircleOutlinedIcon />
                  Vishnu Plus
                </MenuItem>
                <MenuItem>
                  <OrdersIcon />
                  Orders
                </MenuItem>
                <MenuItem>
                  <WishlistIcon />
                  Wishlist
                </MenuItem>
                <MenuItem>
                  <RewardsIcon />
                  Rewards
                </MenuItem>
                <MenuItem>
                  <GiftCardsIcon />
                  Gift Cards
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleSignup} style={{ color: 'blue' }}>
                  New User? Sign Up
                </MenuItem>
                <MenuItem onClick={handleLogin}>
                  <AccountCircleOutlinedIcon />
                  Login
                </MenuItem>
              </>
            )}
          </Menu>
          <Button color="inherit">
<LocalGroceryStoreOutlinedIcon />
Cart
</Button>
<Button color="inherit">
<StorefrontOutlinedIcon />
Become a seller
</Button>
<IconButton color="inherit">
<MoreVertOutlinedIcon />
</IconButton>
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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="login-modal-title" variant="h6" component="h2" gutterBottom>
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
        style={{ marginTop: '16px' }}
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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="signup-modal-title" variant="h6" component="h2" gutterBottom>
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
        style={{ marginTop: '16px' }}
      >
        Sign Up
      </Button>
    </Box>
  </Modal>

  {/* Snackbar */}
  <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
</AppBar>
);
};

export default Header;


