import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import { createGlobalStyle } from "styled-components";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "./store/reducers/auth/action-creators";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./styled/style";
import NavigationContainer from "./components/Navigation/NavigationContainer";
// Alert
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

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

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

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
      <Provider template={AlertTemplate} {...options}>
        <GlobalStyle />
        <NavigationContainer />
        <Wrapper>
          <AppRouter />
        </Wrapper>
      </Provider>
    </>
  );
};

export default App;
