import React, { useEffect, useState } from "react";
import {
  ModalForm,
  ModalFormInput,
  ModalDeleteIcon,
  ModalAddIcon,
  FavoriteIcon,
  FavoriteIconActive,
  CardItemsBox,
} from "../styled/style";
import deleteItemIcon from "../assets/deleteItem.svg";
import addItemIcon from "../assets/addItem.png";

import favoriteIcon from "../assets/favoriteIcon.png";
import favoriteIconActive from "../assets/favoriteIconActive.png";

import CustomButton from "../common/Button/CustomButton";
import CustomModal from "../common/Modal/CustomModal";
import CustomSelect from "../common/Select/CustomSelect";

import { useSelector } from "react-redux";

const ModalAddEdit = ({
  showModal,
  saveList,
  setListTitle,
  setCategory,
  listItem,
  handleAddClick,
  handleInputChange,
  handleRemoveClick,
  setIsFavorites,
  current,
  onClose,
  handleCardDate,
  handleCreateCategory,
  category,
  color,
  setColor,
  date,
}) => {
  const [favorites, setFavorites] = useState(null);
  const { categories } = useSelector((state) => state.userData);

  useEffect(() => {
    setFavorites(current?.isFavorites);
  }, [current]);

  const handleClickIsFavorites = () => {
    setIsFavorites(!favorites);
    setFavorites(!favorites);
  };

  return (
    <CustomModal
      showModal={showModal}
      title={!current ? "Card" : current.listTitle}
      onClose={onClose}
      setIsFavorites={setIsFavorites}
      current={current}
      withCloseButton
      actionHeaderBar={
        !favorites ? (
          <FavoriteIcon
            src={favoriteIcon}
            width="25px"
            height="25px"
            onClick={handleClickIsFavorites}
          />
        ) : (
          <FavoriteIconActive
            src={favoriteIconActive}
            width="25px"
            height="25px"
            onClick={handleClickIsFavorites}
          />
        )
      }
    >
      <ModalForm onSubmit={saveList}>
        <label htmlFor="list-title">Title of your card</label>
        <ModalFormInput
          defaultValue={current ? current.listTitle : ""}
          type="text"
          name="list-title"
          id="list-title"
          required
          placeholder="Enter Card Title"
          onChange={(e) => setListTitle(e.target.value)}
        />

        {/*//! SELECT */}
        <label htmlFor="list-category">
          Select category and date
          <br /> Also you can create your own category in navbar menu
        </label>
        <div
          style={{
            width: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomSelect
            options={categories}
            title={current ? current.category : "Select category"}
            setCategory={setCategory}
            handleCreateCategory={handleCreateCategory}
            category={category}
            color={color}
            setColor={setColor}
          />
          <input
            type="date"
            name=""
            id=""
            // placeholder={date}
            // defaultValue={date}
            // value={date}
            // required
            onChange={handleCardDate}
            style={{
              padding: "9px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "0",
            }}
          />
        </div>
        <label htmlFor="list-items">Add some card items</label>
        <CardItemsBox>
          {listItem.map((field, idx) => {
            return (
              <div
                key={field.id}
                style={{
                  width: "100%",
                  display: "flex",
                  msFlexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <ModalFormInput
                  name="itemValue"
                  placeholder="Enter Shopping Item"
                  value={field.itemValue}
                  id={field.id}
                  onChange={(e) => handleInputChange(idx, e)}
                  required
                />
                <div
                  className="btn-box"
                  style={{ position: "absolute", right: "10px" }}
                >
                  {listItem.length !== 1 && (
                    <ModalDeleteIcon
                      src={deleteItemIcon}
                      width="15px"
                      onClick={() => handleRemoveClick(idx)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </CardItemsBox>

        {
          <ModalAddIcon
            src={addItemIcon}
            width="25px"
            onClick={handleAddClick}
          />
        }
        <CustomButton variant="solid" color="primary" size="md" type="submit">
          {!current ? "Save" : "Save changes"}
        </CustomButton>
      </ModalForm>
    </CustomModal>
  );
};

export default ModalAddEdit;
