import React, { useState } from 'react'
import { DrawerStyled } from '../styled/style'

const Drawer = () => {
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const showSidebar = () => setToggleDrawer(!toggleDrawer)
    return (
        <>
            <button onClick={showSidebar} style={{ margin: "20px  300px" }}>X</button>
            <DrawerStyled toggleDrawer={toggleDrawer} >
            </DrawerStyled>

        </>
    )
}

export default Drawer
