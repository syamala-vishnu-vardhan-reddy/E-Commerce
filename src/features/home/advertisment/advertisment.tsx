import React from 'react';
import styled from 'styled-components';

const AdvertisementContainer = styled.div`
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  text-align: center;
`;

const AdvertisementImage = styled.img`
  width: 100%;
  height: auto;
`;

const Advertisement: React.FC = () => {
  return (
    <AdvertisementContainer>
      <AdvertisementImage src="https://via.placeholder.com/800x200" alt="Advertisement" />
    </AdvertisementContainer>
  );
};

export default Advertisement;
