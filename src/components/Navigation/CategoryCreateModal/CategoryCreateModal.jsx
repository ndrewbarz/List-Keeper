import React from "react";
import CustomButton from "../../../common/Button/CustomButton";
import CustomModal from "../../../common/Modal/CustomModal";
import { ModalFormInput } from "../../../styled/style";
import ColorPicker from "../../ColorPicker";

const CategoryCreateModal = ({
  setShowCategoryModal,
  showCategoryModal,
  handleCreateCategory,
  setCategory,
  setColor,
  color
}) => {
  return (
    <CustomModal
      onClose={() => setShowCategoryModal(false)}
      showModal={showCategoryModal}
      withCloseButton
      title={`Create new category`}
      actionFooterBar={
        <CustomButton
          variant="solid"
          color="secondary"
          onClick={handleCreateCategory}
        >
          Create
        </CustomButton>
      }
    >
      <>
        <label htmlFor="category-title">Name of category</label>
        <ModalFormInput
          name="category-title"
          type="text"
          defaultValue={""}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="category-title">Pick the color of the category</label>
        <ColorPicker setColor={setColor} color={color} />
      </>
    </CustomModal>
  );
};

export default CategoryCreateModal;
