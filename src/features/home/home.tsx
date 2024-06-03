import React from "react";
import CategoryComponent from "./category/Category";
import CarouselLoader from "./productCarocel/ProductCarosel";

const Home: React.FC = () => {
  return (
    <>
      <CarouselLoader />
      <CategoryComponent />
    </>
  );
};

export default Home;
