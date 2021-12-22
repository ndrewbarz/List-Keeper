import React from "react";
import { DrawerStyled } from "../../styled/style";

const Drawer = ({ children, toggleDrawer }) => {
  return (
    <DrawerStyled toggleDrawer={toggleDrawer}>
      {children}
    </DrawerStyled>
  );
};

export default Drawer;
