import React from "react";
import {
  ModalForm,
  ModalFormInput,
  ModalDeleteIcon,
  ModalAddIcon,
} from "../styled/style";
import deleteItemIcon from "../assets/deleteItem.svg";
import addItemIcon from "../assets/addItem.png";

import CustomButton from "../common/Button/CustomButton";
import CustomModal from "../common/Modal/CustomModal";

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
}) => {
  return (
    <>
      {showModal ? (
        <CustomModal
          showModal={showModal}
          setShowModal={setShowModal}
          setIsFavorites={setIsFavorites}
          current={current}
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

            {
              <ModalAddIcon
                src={addItemIcon}
                width="25px"
                onClick={handleAddClick}
              />
            }
            <CustomButton
              variant="solid"
              color="success"
              size="md"
              type="submit"
            >
              {!current ? "Save" : "Save changes"}{" "}
            </CustomButton>
          </ModalForm>
        </CustomModal>
      ) : null}
    </>
  );
};

export default ModalAddEdit;
