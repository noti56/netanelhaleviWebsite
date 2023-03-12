// components/layout.js

import React from "react";
import Navbar from "./Navbar";
interface props {
  children: React.ReactNode;
}
export default function Layout({ children }: props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
