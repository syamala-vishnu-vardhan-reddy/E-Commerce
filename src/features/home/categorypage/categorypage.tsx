import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  addToCartRequest,
  authState,
  getCategories,
  getProducts,
} from "../slices/slices";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const StyledCard = styled(Card)({
  transition: "transform 0.5s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:hover .add-to-cart-btn": {
    display: "block",
  },
});
interface CategoryCheckboxProps {
  category: any;
  handleCheckboxChange: (id: string) => void;
  openItems: string[];
  toggleSubtypes: (id: string) => void;
}

const CategoryCheckbox: React.FC<CategoryCheckboxProps> = ({
  category,
  handleCheckboxChange,
  openItems,
  toggleSubtypes,
}) => {
  return (
    <Box ml={2}>
      <FormControlLabel
        label={category.name}
        control={
          <div style={{ display: "flex", alignItems: "center" }}>
            {category.children && category.children.length > 0 && (
              <>
                {openItems.includes(category._id) && category.children ? (
                  <ArrowDropDownIcon
                    onClick={() => toggleSubtypes(category._id)}
                  />
                ) : (
                  <ArrowRightIcon
                    onClick={() => toggleSubtypes(category._id)}
                  />
                )}
              </>
            )}
            <Checkbox onChange={() => handleCheckboxChange(category._id)} />
          </div>
        }
      />
      {openItems.includes(category._id) &&
        category.children &&
        category.children.length > 0 && (
          <div style={{ paddingLeft: "20px" }}>
            {category.children.map((child: any) => (
              <CategoryCheckbox
                key={child._id}
                category={child}
                handleCheckboxChange={handleCheckboxChange}
                openItems={openItems}
                toggleSubtypes={toggleSubtypes}
              />
            ))}
          </div>
        )}
    </Box>
  );
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, products } = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleSubtypes = (id: string) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter((item) => item !== id)
        : [...prevOpenItems, id]
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setSelectedItems([]);
    setOpenItems([]);
  }, [categoryId]);

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

  return (
    <Box sx={{ width: "90%", marginLeft: 5, marginBottom: 40 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2}>
          <Box sx={{ width: "100%", marginLeft: 5, marginBottom: 40 }}>
            <Box mt={4}>
              <Grid container spacing={4}>
                {categories.map((category: any) => (
                  <React.Fragment key={category._id}>
                    {categoryId === category._id &&
                      category.children &&
                      category.children.length > 0 &&
                      category.children.map((child: any) => (
                        <CategoryCheckbox
                          key={child._id}
                          category={child}
                          handleCheckboxChange={handleCheckboxChange}
                          openItems={openItems}
                          toggleSubtypes={toggleSubtypes}
                        />
                      ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Box sx={{ width: "100%", marginLeft: 5, marginBottom: 40 }}>
            <Box mt={4}>
              <Grid container spacing={4}>
                {categories && categories.length > 0 ? (
                  categories.map((category: any) => (
                    <React.Fragment key={category._id}>
                      {category._id === categoryId &&
                      products &&
                      products.length > 0 ? (
                        products
                          .filter((product: any) => {
                            if (product.categoryId === category._id)
                              return true;
                            if (category.children) {
                              return category.children.some(
                                (child: any) =>
                                  product?.category?.parentId === child._id
                              );
                            }
                            return false;
                          })
                          .filter((product: any) => {
                            if (selectedItems && selectedItems.length > 0) {
                              return (
                                selectedItems.includes(product?.category._id) ||
                                selectedItems.includes(
                                  product?.category.parentId
                                )
                              );
                            } else {
                              return true;
                            }
                          })
                          .map((product: any) => (
                            <Grid
                              item
                              key={product._id}
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
                                      handleAddToCart(
                                        product._id,
                                        product.price
                                      );
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
                    </React.Fragment>
                  ))
                ) : (
                  <Typography>NO products Found</Typography>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
