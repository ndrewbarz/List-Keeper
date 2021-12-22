import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";

const AppRouter = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const targetRoutes = isAuth ? privateRoutes : publicRoutes;

  useEffect(() => {
    !isAuth ? navigate("/login") : navigate('/')
  }, [isAuth]);

  return (
    <Routes>
      {targetRoutes.map((route) => (
        <Route path={route.path} element={route.component} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
