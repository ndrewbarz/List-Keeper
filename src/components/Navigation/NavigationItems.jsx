import React from "react";
import Link, {
  AddIcon,
  AddCategoryIcon,
  FavoriteIcon,
  LogoutIcon,
  AddIconPulseAnimation,
  NavTitleStyled,
  CalendarIcon,
  LogoIcon,
  NavIconsBox,
  LogoutBox,
  LogoutName,
  LogoText,
  DrawerButton,
  LoginBox,
  NavlinkStyled,
} from "../../styled/style";
import plus from "../../assets/add.png";
import addCategoryIcon from '../../assets/addCategoryIcon.svg';
import logOut from "../../assets/logout.png";
import favoriteIcon from "../../assets/favoriteIcon.png";
import calendarIcon from "../../assets/calendar.png";
import favoriteIconActive from "../../assets/favoriteIconActive.png";
import logoIcon from "../../assets/logo.png";

import CustomButton from "../../common/Button/CustomButton";

import SearchBar from "../SearchBar";
import Calendar from "./Calendar/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const NavigationItems = ({
  isAuth,
  searchText,
  handleSearch,
  toggleCalendar,
  showCalendar,
  setShowCalendar,
  filterFavorites,
  handleFilter,
  lists,
  toggleModal,
  user,
  handleLogout,
  showSidebar,
  openAddCategoryModal,
  filterByDate,
  handleDayClick
}) => {
  return (
    <>
      {isAuth ? (
        <>
          <DrawerButton onClick={showSidebar}  >
            {showSidebar && <FontAwesomeIcon icon={faBars} />}
          </DrawerButton>
          <NavTitleStyled>
            <LogoIcon src={logoIcon} />
            <LogoText>List Keeper</LogoText>
          </NavTitleStyled>
          <SearchBar
            type="text"
            value={searchText}
            placeholder="Type to search by Title"
            onChange={handleSearch}
          />
          <NavIconsBox>
            <CalendarIcon
              src={calendarIcon}
              width="25px"
              height="25px"
              onClick={toggleCalendar}
            />
            <Calendar
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
            >
              <DayPicker selectedDays={filterByDate} onDayClick={handleDayClick} />
              <p style={{ textAlign: "center" }}>
                {filterByDate ? filterByDate : "Please select a day 👻"}
              </p>
            </Calendar>
            {filterFavorites ? (
              <FavoriteIcon
                src={favoriteIconActive}
                width="25px"
                height="25px"
                onClick={handleFilter}
              />
            ) : (
              <FavoriteIcon
                src={favoriteIcon}
                width="25px"
                height="25px"
                onClick={handleFilter}
              />
            )}
            {!lists.length ? (
              <AddIconPulseAnimation
                src={plus}
                width="25px"
                alt="Add List"
                onClick={toggleModal}
              />
            ) : (
              <AddIcon
                src={plus}
                width="25px"
                alt="Add List"
                onClick={toggleModal}
              />
            )}
            <AddCategoryIcon src={addCategoryIcon}
              width="25px"
              alt="Add Category"
              onClick={() => openAddCategoryModal(true)} />
          </NavIconsBox>

          <LogoutBox>
            <LogoutName>{user.email}</LogoutName>
            <Link to={"/login"}>
              <LogoutIcon src={logOut} width="25px" onClick={handleLogout} />
            </Link>
          </LogoutBox>
        </>
      ) : (
        <LoginBox>
          <CustomButton variant="solid" color="primary">
            <NavlinkStyled to={"/login"}>Login</NavlinkStyled >
          </CustomButton>
          <CustomButton variant="solid" color="primary">
            <NavlinkStyled to={"/registration"}>Registration</NavlinkStyled >
          </CustomButton>
        </LoginBox>
      )}
    </>
  );
};

export default NavigationItems;
