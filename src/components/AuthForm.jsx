import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useLocation } from "react-router-dom";
import Link, { FormStyled, Input, LoadersStyled, PreviewImgStyled } from "../styled/style";
import CustomButton from "../common/Button/CustomButton";
import LogoIcon from "../assets/logo.png"
import PreviewImg from "../assets/preview.jpg"
import { useAlert } from "react-alert";

const AuthForm = () => {
  const alert = useAlert();
  const { error, isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    error && alert.error(`${error}`)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.pathname === "/login") {
      dispatch(AuthActionCreators.login(email, password));
    } else if (location.pathname === "/registration") {
      dispatch(AuthActionCreators.registration(email, password));
    }

    setEmail('')
    setPassword('')

  };

  return (
    <>
      {isLoading ? (
        <LoadersStyled type="Rings" color="#00BFFF" height={80} width={80} />
      ) :
        <>
          <PreviewImgStyled src={PreviewImg} alt="" />
          <FormStyled onSubmit={handleSubmit}>
            <img src={LogoIcon} alt="" />
            <h2>{location.pathname === "/login" ? "Login to" : "Register to"} List Keeper</h2>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="Email"
              type="email"
              placeholder="Email"
              required
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="Password"
              type="password"
              placeholder="Password"
              required
            />
            <CustomButton variant="solid" color="primary">
              {location.pathname === "/login" ? "Sign In" : "Sign Up"}
            </CustomButton>
            {location.pathname === "/login" ? (
              <p>
                New user? <Link to={"/registration"}>Create account</Link>
              </p>
            ) : (
              <p>
                Have account? <Link to={"/login"}>Sign in</Link>
              </p>
            )}
          </FormStyled>
        </>
      }

    </>
  );
};

export default AuthForm;
