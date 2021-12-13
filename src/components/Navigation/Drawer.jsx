import React, { useState } from "react";
import { DrawerButton, DrawerStyled } from "../../styled/style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Drawer = ({ children, toggleDrawer, showSidebar }) => {
  console.log(children);
  return (
    <DrawerStyled toggleDrawer={toggleDrawer}>
      <DrawerButton onClick={showSidebar}  >
        <FontAwesomeIcon icon={faTimes} />
      </DrawerButton>
      {children}
    </DrawerStyled>
  );
};

export default Drawer;
