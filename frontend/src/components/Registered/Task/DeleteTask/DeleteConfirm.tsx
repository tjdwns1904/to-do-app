import { Button } from "react-bootstrap";

interface Props {
    type: string;
    onCloseModal: () => void;
    onConfirm: () => void;
}

function DeleteConfirm({ type, onCloseModal, onConfirm }: Props) {
    return (
        <div className="background">
            <div className="modal-container">
                <h2>Confirm</h2>
                <p className="mb-5">Are you sure you want to delete this {type}?</p>
                <div className="text-end">
                    <Button variant="danger" onClick={onConfirm}>Delete</Button>
                    <Button variant="outline-secondary" className="ms-2" onClick={onCloseModal}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm;