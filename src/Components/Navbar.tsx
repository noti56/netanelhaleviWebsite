import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  height: 5%;
  background-color: lightgray;
  display: flex;
  gap: 15px;
`;
const Navbar = () => {
  return (
    <Nav>
      <Link href={"/"}>main page</Link>
      <Link href={"/portfolio"}>Portfolio</Link>
      <Link href={"/leaveDetails"}>leaveDetails</Link>
      <Link href={"/login"}>Admin</Link>
    </Nav>
  );
};

export default Navbar;
