import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  addToCartRequest,
  authState,
  getCategories,
  getProducts,
} from "../slices/slices";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)({
  transition: "transform 0.5s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:hover .add-to-cart-btn": {
    display: "block",
  },
});

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: any }>();
  const { categories, error, products } = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to store selected types
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  console.log(error);
  useEffect(() => {
    if (categoryId) {
      dispatch(getCategories());
      dispatch(getProducts());
    }
  }, [categoryId, dispatch]);

  const handleProductClick = (productId: string) => {
    // Handle product click action
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId: string, price: number) => {
    // Handle adding product to cart action
    const addToCartData = {
      products: {
        product: productId,
        price: price,
        quantity: 1,
      },
    };
    dispatch(addToCartRequest(addToCartData));
  };

  const handleCheckboxChange = (type: string) => {
    // Handle checkbox change
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <Grid container spacing={4}>
      {/* Grid for checkboxes */}
      <Grid item xs={3}>
        {categories &&
          categories.map((category: any) => (
            <React.Fragment key={category._id}>
              {category._id === categoryId &&
                category.children &&
                category.children.map((child: any) => (
                  <FormControlLabel
                    key={child._id}
                    control={
                      <Checkbox
                        checked={selectedTypes.includes(child.name)}
                        onChange={() => handleCheckboxChange(child.name)}
                      />
                    }
                    label={child.name}
                  />
                ))}
            </React.Fragment>
          ))}
      </Grid>

      {/* Grid for products */}
      <Grid item xs={9}>
        {categories && categories.length > 0 ? (
          categories.map((category: any) => (
            <React.Fragment key={category._id}>
              {category._id === categoryId && (
                <>
                  <Typography
                    variant="h4"
                    align="left"
                    gutterBottom
                  ></Typography>
                  <Grid container spacing={2}>
                    {products && products.length > 0 ? (
                      products
                        .filter((product: any) => {
                          if (
                            product.categoryId === category._id &&
                            (!selectedTypes.length ||
                              selectedTypes.includes(product.type))
                          )
                            return true;
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
                            key={product._id}
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ minWidth: 200 }}
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
                                  height: 150,
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
                      <Typography>No products available</Typography>
                    )}
                  </Grid>
                </>
              )}
            </React.Fragment>
          ))
        ) : (
          <Typography>No categories available</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default CategoryPage;
