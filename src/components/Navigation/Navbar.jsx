import React from "react";
import { Navigation } from "../../styled/style";

const Navbar = ({ scrolled, children }) => {
  return <Navigation scrolled={scrolled}>{children}</Navigation>;
};

export default Navbar;
