import React, { useRef } from "react";
import {
  ModalBackground,
  ModalContent,
  ModalWrapper,
  CloseIcon,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalHeaderIcons,
} from "../../styled/style";
import close from "../../assets/close.png";

import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import { useDispatch } from "react-redux";

const CustomModal = ({
  setShowModal,
  title,
  current,
  children,
  actionFooterBar,
  actionHeaderBar,
  withCloseButton,
  showModal,
  onClose
}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const closeModal = () => {
    // e.preventDefault();
    onClose();
    current && dispatch(ListsActionCreators.clearCurrentList(current));
  };

  return (
    showModal &&
    <ModalBackground
      ref={modalRef}
      onClick={(e) => modalRef.current === e.target && closeModal()}
    >
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{title || "Title"}</ModalTitle>
            <ModalHeaderIcons>
              {actionHeaderBar && actionHeaderBar}
              {withCloseButton && (
                <CloseIcon src={close} width="25px" onClick={closeModal} />
              )}
            </ModalHeaderIcons>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{!!actionFooterBar && actionFooterBar}</ModalFooter>
        </ModalContent>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default CustomModal;
