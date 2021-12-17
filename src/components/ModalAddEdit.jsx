import React, { useEffect, useState } from "react";
import {
  ModalForm,
  ModalFormInput,
  ModalDeleteIcon,
  ModalAddIcon,
  FavoriteIcon,
  FavoriteIconActive,
} from "../styled/style";
import deleteItemIcon from "../assets/deleteItem.svg";
import addItemIcon from "../assets/addItem.png";

import favoriteIcon from "../assets/favoriteIcon.png";
import favoriteIconActive from "../assets/favoriteIconActive.png";

import CustomButton from "../common/Button/CustomButton";
import CustomModal from "../common/Modal/CustomModal";
import CustomSelect from "../common/Select/CustomSelect";

// import { categories } from "../utils/categories";
import { useSelector } from "react-redux";

const ModalAddEdit = ({
  showModal,
  setShowModal,
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
}) => {
  const [favorites, setFavorites] = useState(null);
  const { categories } = useSelector((state) => state.lists);

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
        <label htmlFor="list-title"> List Title</label>
        <ModalFormInput
          defaultValue={current ? current.listTitle : ""}
          type="text"
          name="list-title"
          id="list-title"
          required
          onChange={(e) => setListTitle(e.target.value)}
        />

        <label htmlFor="list-category">
          Select category or create your own in navbar menu
        </label>
        {/*//! SELECT */}
        <div
          style={{
            width: "85%",
            display: "flex",
            alignItems: "baseline",
          }}
        >
          {/* <ModalFormInput
            defaultValue={""}
            type="text"
            name="list-category"
            id="list-category"
            required
            onChange={(e) => setCategory(e.target.value)}
          /> */}
          <CustomSelect
            options={categories}
            title={current ? current.category : "Select category"}
            setCategory={setCategory}
          />
        </div>
        <label htmlFor="list-items">Add shopping items</label>
        <div
          style={{
            overflow: "auto",
            width: "100%",
            height: "200px",
            overflowX: "hidden",
            boxSizing: "content-box",
          }}
        >
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
        </div>

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
