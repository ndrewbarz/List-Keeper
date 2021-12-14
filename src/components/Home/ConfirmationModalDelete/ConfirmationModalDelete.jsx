import React from 'react'
import CustomButton from '../../../common/Button/CustomButton';
import CustomModal from '../../../common/Modal/CustomModal';
import { Text } from '../../../styled/style';

const ConfirmationModalDelete = ({ setShowConfirmation, handleDelete, deleteId }) => {
    return (
        <CustomModal
            setShowModal={setShowConfirmation}
            withFavorites
        >
            <Text>Are you sure you want to delete?</Text>
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
        </CustomModal>
    )
}

export default ConfirmationModalDelete
