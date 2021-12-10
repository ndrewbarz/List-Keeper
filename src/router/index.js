import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";

export const RoutesNames = {
  LOGIN: "/login",
  REGISTRATION: "/registration",
  HOMEPAGE: "/",
};

export const publicRoutes = [
  {
    path: RoutesNames.LOGIN,
    component: <AuthPage />,
  },
  {
    path: RoutesNames.REGISTRATION,
    component: <AuthPage />,
  },
];

export const privateRoutes = [
  {
    path: RoutesNames.HOMEPAGE,
    component: <HomePage />,
  },
];
