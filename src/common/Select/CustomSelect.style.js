import styled from "styled-components";

export const DropDownContainer = styled.div`
  width: 260px;
  user-select: none;
  margin: 10px 0;
  position: relative;
  z-index: 9;
  // margin-left: 15px;
`;

export const DropDownHeader = styled.div`
  padding: 5px 10px;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  // font-weight: bold;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
`;

export const DropDownListContainer = styled.div``;

export const DropDownList = styled.ul`
  position: absolute;
  list-style: none;
  top: 70%;
  left: 0;
  padding: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  font-weight: 500;
  color: #333;
  width: 100%;
`;

export const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background: #f4f4f4;
  }
`;
