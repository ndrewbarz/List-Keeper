import styled from "styled-components";
import { keyframes } from "styled-components";
import { Link, NavLink } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { device } from "../utils/breakpoints.js";

export const LoadersStyled = styled(Loader)`
  position: absolute;
  z-index: 999;
  margin: 300px auto;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

export const ShareLink = styled.a`
  text-decoration: none;
  color: #243b55;
  padding: 3px 5px;
  :hover {
    font-weight: bold;
  }
`;
// filter
export const FilterRemoveButtonStyled = styled.button`
  position: sticky;
  border: 0;
  border-radius: 10px;
  background: #49586b;
  color: #fff;
  font-weight: bold;
  padding: 5px 20px 5px 5px;
  margin: 10px;
  top: 60px;
  left: 100px;
  cursor: pointer;
  :hover {
    background: #a3342f;
    box-shadow: 0px 2px 5px #a3342f;
  }
`;
export const FilterRemoveIconStyled = styled(FontAwesomeIcon)`
  position: absolute;
  right: 6px;
  top: 6px;
`;

export const RemoveFilterBox = styled.div`
  width: 100%;
  display: flex;
  margin: 0 100px;
`;

export const TextStyled = styled.h2`
  color: ${(props) => props.color};
  margin-top: 200px;
`;

export const Text = styled.span`
  color: ${(props) => props.color};
  padding: 5px 20px;
  line-height: 1.7;
`;

export default styled(Link)`
  color: #fff;
  text-decoration: none;
`;

export const NavlinkStyled = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  &.active {
    color: red;
  }
`;

// navigation
export const Navigation = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  font-weight: bold;
  border-bottom: 0.5px solid #000;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) => (props.scrolled ? "0px 2px 5px #000" : null)};
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export const NavTitleStyled = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;

  @media ${device.tablet} {
    // margin: 40px 0;
  }
`;

export const NavIconsBox = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-evenly;
  & > img {
    margin: 0;
  }
`;

export const LogoutBox = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  & > button {
    margin: 10px;
  }
`;
export const LogoutName = styled.span``;

export const LogoText = styled.span``;

// drawer
export const DrawerStyled = styled.div`
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: ${({ toggleDrawer }) => (toggleDrawer ? "0" : "-100%")};
  background-color: #232323;
  transition: 0.5s ease;
  overflow-x: hidden;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DrawerButton = styled.div`
  display: block;
  margin: 15px 10px;
  color: #fff;
  z-index: 99999;
  position: absolute;
  cursor: pointer;
`;

// calendar
export const CalendarStyled = styled.div`
  position: absolute;
  background: #141e30;
  border-radius: 5px;
  box-shadow: 0px 2px 5px #000;
  top: 50px;
`;

export const CalendarBackground = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1220px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  align-items: center;
`;

export const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
`;

// SearchBar
export const SearchBarIconStyled = styled(FontAwesomeIcon)`
  position: absolute;
  top: 8px;
  right: -5px;
`;

export const SearchBarBoxStyled = styled.div`
  width: 100%;
  max-width: 300px;
  margin-right: 100px;
  position: relative;
`;

export const SearchBarStyled = styled.input`
  width: 100%;
  padding: 7px 10px;
  margin-right: 100px;
  border-radius: 5px;
  border: 0;
  outline: none;
  background: #354960;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  placeholder: ${(props) => props.placeholder};
  ::placeholder {
    color: #f8f8f8;
    font-weight: normal;
  }
  :focus::placeholder {
    color: transparent;
  }
`;

//! MEDIA
export const ContainerNav = styled(Navigation)`
  @media ${device.desktop} {
    ${DrawerButton} {
      display: none;
    }
  }
  @media ${device.tablet} {
    justify-content: flex-end;

    ${NavIconsBox}, ${LogoutName} {
      display: none;
    }
    ${SearchBarBoxStyled} {
      margin: 0 30px;
    }
    ${DrawerButton} {
      left: 0px;
      display: block;
      z-index: 999999;
    }
    ${DrawerStyled} {
      color: #fff;
    }
    // ${Container} {
    //   flex-direction: column;
    // }
  }

  @media ${device.mobileL} {
    ${NavIconsBox}, ${LogoutBox}, ${LogoText}, ${NavTitleStyled} {
      display: none;
    }
    ${DrawerStyled} {
      color: #fff;
      width: 100%;
    }
    ${DrawerButton} {
      display: block;
      z-index: 999999;
    }
    ${SearchBarBoxStyled} {
      max-width: 250px;
      margin: 5px auto;
    }
    ${SearchBarStyled} {
      max-width: 230px;
    }
    ${SearchBarIconStyled} {
      top: 8px;
      right: 10px;
    }
  }
`;

export const ContainerDrawer = styled(DrawerStyled)`
  color: #fff;
  width: 100%;
  max-width: 350px;
  padding: 10px;
  gap: 1rem;
  @media ${device.laptop} {
    ${DrawerButton} {
      right: 10px;
      display: block;
    }
    ${SearchBarBoxStyled} {
      max-width: 250px;
      margin: 5px auto;
    }

    ${SearchBarStyled} {
      margin: 25px 0;
    }
    ${SearchBarIconStyled} {
      top: 32px;
      right: 0px;
    }
  }
  @media ${device.mobileL} {
    max-width: -webkit-fill-available;

    ${SearchBarBoxStyled} {
      max-width: 250px;
      margin: 5px auto;
    }

    ${SearchBarStyled} {
      margin: 25px 0;
    }
    ${SearchBarIconStyled} {
      top: 32px;
      right: 0px;
    }
    ${DrawerButton} {
      display: block;
      top: 0;
      right: 15px;
    }
  }
`;

//! END MEDIA

// Form
export const FormStyled = styled.form`
  // margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  max-width: 350px;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  transition: 0.5s;
  outline: none;
  ::placeholder {
    color: rgb(187, 188, 190);
    font-size: 15px;
  }
  :focus {
    border: 2px solid #777;
  }
`;

export const ButtonStyled = styled.button`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 8px;
  outline: none;
  margin: 10px;
  background: #243b55;
  color: #fff;
  // width: 100%;
  border: 0px solid #999;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    // background: #141E30;
  }
`;

// Card
export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: fit-content;
  margin: 10px;

  background: rgba(255, 255, 255, 0.192);
  backdrop-filter: blur(10px);

  border-radius: 5px;
  transition: 0.1s;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  :hover {
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.5);
  }
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 15px;
  transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) all;
`;

export const CardInfoLeft = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
`;
export const CardInfoRight = styled.div`
  display: flex;
  width: 40%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: baseline;
  color: #fff;
  flex-wrap: wrap;
`;

export const CardTitle = styled.p`
  color: #fff;
  margin: 5px 10px;
  align-self: flex-start;
  font-size: 25px;
  font-weight: 600;
`;
export const CardCategory = styled.p`
  color: #fff;
  margin: 1px 10px 10px;
  align-self: flex-start;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px 5px 5px 5px;
  background: #fff;
`;

export const CardItemsBox = styled.div`
  overflow: auto;
  width: 100%;
  height: 200px;
  overflow-x: hidden;
  box-sizing: content-box;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: slategrey;
    outline: none;
  }
`;

//
export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
`;
export const CardItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 10px 0;
  font-weight: bold;
  padding: 3px 5px;
  border-radius: 3px;
  background: rgb(71, 85, 103);
  color: #fff;
`;

// icons
export const IconStyled = styled.img`
  src: ${(props) => props.src};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
`;

export const ArrowIcon = styled(IconStyled)`
  margin: 0 50%;
  transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) all;
`;

export const CloseIcon = styled(IconStyled)`
  // position: absolute;
`;

export const AddIcon = styled(IconStyled)`
  margin: 0 50px 0 10px;
`;

export const AddCategoryIcon = styled(IconStyled)`
  margin: 0 50px 0 10px;
`;

export const AddIconPulseAnimation = styled(IconStyled)`
  animation: ${pulse} 1s infinite;
  margin: 0 50px 0 10px;
`;

export const DeleteIcon = styled(IconStyled)`
  margin: 5px;
`;

export const LogoutIcon = styled(IconStyled)`
  padding: 10px 15px;
`;

export const ModalAddIcon = styled(IconStyled)`
  padding: 10px 15px;
`;

export const ModalDeleteIcon = styled(IconStyled)`
  padding: 10px 15px;
`;

export const EditIcon = styled(IconStyled)`
  // padding: 10px 15px;
`;

export const FavoriteIcon = styled(IconStyled)`
  src: ${(props) => props.src};
`;

export const FavoriteIconActive = styled(IconStyled)`
  src: ${(props) => props.src};
`;

export const CalendarIcon = styled(IconStyled)`
  // padding: 10px 15px;
  margin: 0 10px 0 0;
`;

export const LogoIcon = styled(IconStyled)`
  src: ${(props) => props.src};
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const OptionMenuIconStyled = styled(IconStyled)`
  src: ${(props) => props.src};
  width: 25px;
  height: 25px;
`;

export const OptionDeleteIconStyled = styled(IconStyled)`
  src: ${(props) => props.src};
  width: 25px;
  height: 25px;
`;

export const OptionSaveIconStyled = styled(IconStyled)`
  src: ${(props) => props.src};
  width: 25px;
  height: 25px;
`;

export const ShareIconStyled = styled(IconStyled)`
  src: ${(props) => props.src};
  width: 25px;
  height: 25px;
`;

export const PreviewImgStyled = styled(IconStyled)`
  src: ${(src) => src};
  width: 410px;
  height: 457px;
  cursor: default;
`;

// Modal
export const ModalWrapper = styled.div`
  width: 600px;
  height: fit-content;
  min-height: 250px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  color: #000;
  display: grid;
  grid-template-colums: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const ModalBackground = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #fff;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ModalFormInput = styled.input`
  width: 80%;
  margin-bottom: 5px;
  padding: 10px 13px;
  border: 1px solid #999;
  border-radius: 5px;
  font-size: 1em;
  font-family: "Comfortaa", cursive;
`;

export const ModalTopIcons = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  padding: 0;
  z-index: 10;
`;

// new custom modal

export const ModalHeader = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: space-between;
`;

export const ModalHeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.span`
  font-size: ${({ size }) => size || "2em"};
  color: #f4f4f4;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 95%;
`;

export const ModalFooter = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  & > button {
    margin: 20px 10px 0 10px;
  }
`;

// !------------------------------------CARD GRID

export const WrapperGrid = styled(Wrapper)`
  // flex-direction: column;
`;
export const CardWrapperGrid = styled(CardWrapper)`
  width: 80%;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 1fr 1fr;
  align-items: center;
  color: #fff;
  padding: 5px 5px 5px 20px;
  justify-items: center;
`;

export const GridViewIconStyled = styled(IconStyled)`
  src: ${(props) => props.src};
  width: 25px;
  height: 25px;
`;
export const RowViewIconStyled = styled(IconStyled)`
  src: ${(props) => props.src};
  width: 25px;
  height: 25px;
`;

export const GridTableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 1fr 1fr;
  justify-items: center;
  width: 80%;
  margin: 10px;
  color: #fff;
  fontweight: bold;

  & > span {
    cursor: pointer;
    display: flex;
    align-items: center;
    & > img {
      width: 20px;
      cursor: pointer;
    }
  }
`;
// !------------------------------------
