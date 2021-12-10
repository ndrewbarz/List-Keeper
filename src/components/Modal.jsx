import React, { useEffect, useRef, useState } from "react";
import {
  ModalBackground,
  ModalContent,
  ModalWrapper,
  CloseIcon,
  FavoriteIcon,
  FavoriteIconActive,
  ModalForm,
  ModalFormInput,
  ModalDeleteIcon,
  ModalAddIcon,
  ModalBtn,
  ModalTopIcons,
} from "../styled/style";
import close from "../assets/close.png";
import deleteItemIcon from "../assets/deleteItem.svg";
import addItemIcon from "../assets/addItem.png";

import favoriteIcon from "../assets/favoriteIcon.png";
import favoriteIconActive from "../assets/favoriteIconActive.png";
import { ListsActionCreators } from "../store/reducers/userData/action-creators";
import { useDispatch } from "react-redux";

const Modal = ({
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
}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    setFavorites(current?.isFavorites);
  }, [current]);

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
    dispatch(ListsActionCreators.clearCurrentList(current));
  };

  const handleClickIsFavorites = () => {
    setIsFavorites(!favorites);
    setFavorites(!favorites);
  };

  return (
    <>
      {showModal ? (
        <ModalBackground
          ref={modalRef}
          onClick={(e) => modalRef.current === e.target && closeModal(e)}
        >
          <ModalWrapper showModal={showModal}>
            <ModalTopIcons>
              {!favorites ? (
                <FavoriteIcon
                  src={favoriteIcon}
                  width="25px" height="25px"
                  onClick={handleClickIsFavorites}
                />
              ) : (
                <FavoriteIconActive
                  src={favoriteIconActive}
                  width="25px" height="25px"
                  onClick={handleClickIsFavorites}
                />
              )}
              <CloseIcon src={close} width='25px' onClick={closeModal} />
            </ModalTopIcons>
            <ModalContent>
              {/*  */}
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

                <label htmlFor="list-category"> List Category</label>
                <ModalFormInput
                  defaultValue={current ? current.category : ""}
                  type="text"
                  name="list-category"
                  id="list-category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />

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

                {<ModalAddIcon src={addItemIcon} width="25px" onClick={handleAddClick} />}
                <ModalBtn background="#bce4bc" type="submit">
                  {!current ? "Save" : "Save changes"}
                </ModalBtn>
              </ModalForm>
              {/*  */}
            </ModalContent>
          </ModalWrapper>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default Modal;
