import React from 'react'
import CustomModal from '../../common/Modal/CustomModal'
import { Text } from '../../styled/style'

const Confirmation = ({ message, children, showModal, setShowModal, showConfirmation }) => {
    return (
        <CustomModal showModal={showModal}
            setShowModal={setShowModal}>
            <Text>{message}</Text>
            {children}
        </CustomModal>
    )
}

export default Confirmation
