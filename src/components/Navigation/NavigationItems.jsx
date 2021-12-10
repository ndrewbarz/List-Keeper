import React from "react";
import Link, {
  AddIcon,
  FavoriteIcon,
  LogoutIcon,
  Container,
  AddIconPulseAnimation,
  NavTitleStyled,
  CalendarIcon,
  LogoIcon,
} from "../../styled/style";
import plus from "../../assets/add.png";
import logOut from "../../assets/logout.png";
import favoriteIcon from "../../assets/favoriteIcon.png";
import calendarIcon from "../../assets/calendar.png";
import favoriteIconActive from "../../assets/favoriteIconActive.png";
import logoIcon from "../../assets/logo.png";

import Button from "../Button";

import SearchBar from "../SearchBar";
import Calendar from "../Calendar";

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
}) => {
  return (
    <>
      {isAuth ? (
        <Container>
          <NavTitleStyled>
            <LogoIcon src={logoIcon} />
            List Keeper
          </NavTitleStyled>
          <SearchBar
            type="text"
            value={searchText}
            placeholder="Type to search by Title"
            onChange={handleSearch}
          />
          <div>
            <CalendarIcon
              src={calendarIcon}
              width="25px"
              height="25px"
              onClick={toggleCalendar}
            />
            <Calendar
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
            />
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
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{user.email}</span>
            <Link to={"/login"}>
              <LogoutIcon src={logOut} width="25px" onClick={handleLogout} />
            </Link>
          </div>
        </Container>
      ) : (
        <>
          <Button>
            <Link to={"/login"}>Login</Link>
          </Button>
          <Button>
            <Link to={"/registration"}>Registration</Link>
          </Button>
        </>
      )}
    </>
  );
};

export default NavigationItems;
