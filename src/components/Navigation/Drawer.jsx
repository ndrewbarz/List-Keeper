import React, { useState } from "react";
import { DrawerStyled } from "../../styled/style";

const Drawer = ({ children }) => {
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const showSidebar = () => setToggleDrawer(!toggleDrawer);
  console.log(children)
  return (
    <>
      <button onClick={showSidebar} style={{ margin: "20px  300px", zIndex: "9999", position: "absolute" }}>
        X
      </button>
      <DrawerStyled toggleDrawer={toggleDrawer}>

        {children}</DrawerStyled>

    </>
  );
};

export default Drawer;
