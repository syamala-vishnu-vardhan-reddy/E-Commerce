// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/home/home";
import ProductPage from "./features/home/productPage/ProductPage";
import Header from "./features/home/header/header";
import { Box, CssBaseline } from "@mui/material";
import CartSummary from "./features/home/cartsummary/cartsummary";
import CategoryPage from "./features/home/categorypage/categorypage";
import SearchResultsPage from "./features/home/searchpage/searchPage";

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box sx={{ flex: 1, width: "100%", p: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cartSummary" element={<CartSummary />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route
              path="/search/:searchQuery"
              element={<SearchResultsPage />}
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
