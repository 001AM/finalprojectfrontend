// src/components/BaseLayout.js
import React from "react";
import Navbar from "../components/Navbar";

const BaseLayout = ({ children }) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default BaseLayout;
