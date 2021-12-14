import styled, { css } from "styled-components";
import { buttonColor, buttonSize, buttonVariant } from "./CustomButton";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 16px;
  user-select: none;
  position: relative;
  white-space: nowrap;
  outline: transparent solid 2px;
  outline-offset: 2px;
  border: none;
  cursor: pointer;
  width: max-content;
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  border-radius: 4px;
  &:hover {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  ${({
    variant = buttonVariant.solid,
    color = buttonColor.primary,
    size = buttonSize.md,
  }) => {
    const themeColor = buttonColor[color];
    const themeSize = buttonSize[size];

    switch (variant) {
      case buttonVariant.solid:
        return css`
          background-color: ${themeColor};
          padding: ${themeSize};

          // &:hover {
          //   background-color: #1b5e20;
          // }
        `;
      case buttonVariant.outline:
        return css`
          background-color: transparent;
          color: ${themeColor};
          padding: ${themeSize};
          border: 1px solid ${themeColor};
        `;
      case buttonVariant.ghost:
        return css`
          background-color: transparent;
          color: ${themeColor};
          padding: ${themeSize};
          border: none;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
        `;
      default:
        css`
          background-color: transparent;
          color: ${themeColor};
          padding: ${themeSize};
          border: none;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
        `;
    }
  }}
`;
