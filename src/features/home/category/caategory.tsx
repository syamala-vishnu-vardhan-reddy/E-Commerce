import React from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 20px;
  margin-top: 10px;
`;

const CategoryItem = styled.div`
  text-align: center;
`;

const CategoryImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const Category: React.FC = () => {
  return (
    <CategoryContainer>
      <CategoryItem>
        <CategoryImage src="https://via.placeholder.com/50" alt="Category" />
        <div>Mobiles</div>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage src="https://via.placeholder.com/50" alt="Category" />
        <div>Fashion</div>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage src="https://via.placeholder.com/50" alt="Category" />
        <div>Electronics</div>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage src="https://via.placeholder.com/50" alt="Category" />
        <div>Home</div>
      </CategoryItem>
    </CategoryContainer>
  );
};

export default Category;
