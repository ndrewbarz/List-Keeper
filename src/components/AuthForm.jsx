import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useNavigate, useLocation } from "react-router-dom";
import Link, { FormStyled, Input } from "../styled/style";
import CustomButton from "../common/Button/CustomButton";
import LogoIcon from "../assets/logo.png"

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === "/login") {
      dispatch(AuthActionCreators.login(email, password));
    } else if (location.pathname === "/registration") {
      dispatch(AuthActionCreators.registration(email, password));
    }

    navigate("/");
  };
  return (
    <>
      {!isAuth && (
        <FormStyled onSubmit={handleSubmit}>
          <img src={LogoIcon} alt="" />
          <h2>List Keeper</h2>
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
      )}
    </>
  );
};

export default AuthForm;
