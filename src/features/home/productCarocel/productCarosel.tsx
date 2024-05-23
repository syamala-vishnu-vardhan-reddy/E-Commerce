import React from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  background-color: #fff;
  margin-top: 10px;
`;

const ProductItem = styled.div`
  flex: 0 0 auto;
  width: 150px;
  margin-right: 20px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductCarousel: React.FC = () => {
  return (
    <CarouselContainer>
      {[...Array(10)].map((_, index) => (
        <ProductItem key={index}>
          <ProductImage src="https://via.placeholder.com/150" alt="Product" />
          <div>Product Name</div>
          <div>$100</div>
        </ProductItem>
      ))}
    </CarouselContainer>
  );
};

export default ProductCarousel;
