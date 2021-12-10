import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "./store/reducers/auth/action-creators";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./styled/style";
import Drawer from "./components/Drawer";
import NavigationContainer from "./components/Navigation/NavigationContainer";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Comfortaa', cursive;
    background: #141E30;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      dispatch(AuthActionCreators.checkIsAuth());
      navigate("/");
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      {/* <Navbar /> */}
      <NavigationContainer />
      {/* <Drawer /> */}
      <Wrapper>
        <AppRouter />
      </Wrapper>
    </>
  );
};

export default App;
