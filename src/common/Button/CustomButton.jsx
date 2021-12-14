import React from "react";
import { Button } from "./customButton.styles";

export const buttonSize = {
  xs: "2px 4px",
  sm: "4px 6px",
  md: "6px 16px",
  lg: "15px 35px",
};

export const buttonVariant = {
  solid: "solid",
  outline: "outline",
  ghost: "ghost",
};

export const buttonColor = {
  primary: "#243b55",
  secondary: "#9c27b0",
  success: "#2e7d32",
  danger: "#d32f2f",
};

const CustomButton = ({
  variant = buttonVariant.solid,
  color = buttonColor.primary,
  size = buttonSize.md,
  type,
  children,
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
