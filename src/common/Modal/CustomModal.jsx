import React, { useEffect, useRef, useState } from "react";
import {
    ModalBackground,
    ModalContent,
    ModalWrapper,
    CloseIcon,
    FavoriteIcon,
    FavoriteIconActive,
    ModalTopIcons,
} from "../../styled/style";
import close from "../../assets/close.png";

import favoriteIcon from "../../assets/favoriteIcon.png";
import favoriteIconActive from "../../assets/favoriteIconActive.png";
import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import { useDispatch } from "react-redux";

const CustomModal = ({
    // showModal,
    setShowModal,
    setIsFavorites,
    current,
    children
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
            {/* {showModal ? ( */}
            <ModalBackground
                ref={modalRef}
                onClick={(e) => modalRef.current === e.target && closeModal(e)}
            >
                {/* <ModalWrapper showModal={showModal}> */}
                <ModalWrapper >
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

                        {children}

                    </ModalContent>
                </ModalWrapper>
            </ModalBackground>
            {/* ) : null} */}
        </>
    );
};

export default CustomModal;
