import Link from "next/link";
import React from "react";
import styled from "styled-components";

const PortfolioContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const portfolio = () => {
  return (
    <PortfolioContainer>
      <iframe src="https://netanel-halevi.web.app/" width={"100%"} height={"100%"}></iframe>
    </PortfolioContainer>
  );
};

export default portfolio;
