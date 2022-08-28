import React from "react";
import {Modal, Button} from "react-bootstrap";

export const DeleteModal = (props) => {
    const handleDelete = () => {
        props.setCelebrities(props.celebrities.filter((celebrities) => celebrities.id !== props.celebId));
        props.setModalShow(!props.modalShow);
    };

    return (
        <div>
            <Modal show={
                    props.modalShow
                }
                onHide={
                    () => {
                        props.setModalShow(!props.modalShow);
                    }
            }>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Celebrity Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={
                            () => props.setModalShow(!props.modalShow)
                    }>
                        Cancel
                    </Button>
                    <Button variant="danger"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
