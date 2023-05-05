import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const ContainerCentered = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
interface PageContianerProps {
  children: React.ReactNode;
  centerContent?: boolean;
}

const PageContainer = ({ children, centerContent }: PageContianerProps) => {
  if (centerContent) {
    return <ContainerCentered>{children}</ContainerCentered>;
  }
  return <Container>{children}</Container>;
};

export default PageContainer;
