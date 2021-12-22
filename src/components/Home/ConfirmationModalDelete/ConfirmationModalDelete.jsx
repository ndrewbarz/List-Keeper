import React from 'react'
import CustomButton from '../../../common/Button/CustomButton';
import CustomModal from '../../../common/Modal/CustomModal';

const ConfirmationModalDelete = ({ setShowConfirmation, handleDelete, deleteId, filteredCards, showConfirmation }) => {
    const { listTitle } = filteredCards.find(card => card._id === deleteId)

    return (
        <CustomModal
            onClose={() => setShowConfirmation(false)}
            showModal={showConfirmation}
            title={" "}
            actionFooterBar={
                <>
                    <CustomButton
                        variant="solid"
                        color="secondary"
                        onClick={() => {
                            setShowConfirmation(false);
                        }}
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        variant="solid"
                        color="danger"
                        onClick={() => handleDelete(deleteId)}
                    >
                        Delete
                    </CustomButton>

                </>
            }
        >
            <h2 style={{ textAlign: "center" }}>{`Are you sure want to delete "${listTitle || `this`}" card?`}</h2>
        </CustomModal>
    )
}

export default ConfirmationModalDelete
