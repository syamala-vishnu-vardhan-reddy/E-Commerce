import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Input,
} from "@mui/material";

function Profile() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    userName: "",
    address: {
      country: "",
      fullName: "",
      addressPhoneNumber: "",
      pinCode: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
    },
    image: null, // For storing the uploaded image
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      address: {
        ...prevDetails.address,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      image: imageFile,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you can save userDetails in one variable or send it to an API
    console.log(userDetails);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="userName"
              value={userDetails.userName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={userDetails.address.country}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={userDetails.address.fullName}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="addressPhoneNumber"
              value={userDetails.address.addressPhoneNumber}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pin Code"
              name="pinCode"
              value={userDetails.address.pinCode}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={userDetails.address.addressLine1}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addressLine2"
              value={userDetails.address.addressLine2}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 3"
              name="addressLine3"
              value={userDetails.address.addressLine3}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={userDetails.address.city}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={userDetails.address.state}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Upload Image:</Typography>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Profile;
