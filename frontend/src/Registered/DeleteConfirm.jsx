import React from "react";
import { Button } from "react-bootstrap";

function DeleteConfirm({ type, handleDelete, handleClose }) {
    return (
        <div className="background">
            <div className="modal-container">
                <h2>Confirm</h2>
                <p className="mb-5">Are you sure you want to delete this {type}?</p>
                <div className="text-end">
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="outline-secondary" className="ms-2" onClick={handleClose}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm;