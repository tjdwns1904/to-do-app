import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import LoadingPage from "@/pages/LoadingPage";

interface Props {
    type: string;
    onCloseModal: () => void;
    onConfirm: (item: string) => void;
}

function AddForm({ type, onCloseModal, onConfirm }: Props) {
    const [name, setName] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const handleConfirm = () => {
        if (name !== "") {
            setIsLoading(true);
            setIsValid(true);
            onConfirm(name);
        } else {
            setIsValid(false);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setName(e.target.value);

    return (
        <>
            {isLoading && <LoadingPage />}
            <div className="background upper-layer" onClick={onCloseModal}>
            </div>
            <div className="modal-container upper-layer">
                <h2>Add {type}</h2>
                <Form>
                    <Form.Control value={name} onChange={(e) => handleChange(e)} placeholder="Name" />
                    <div className="mt-5">
                        {!isValid && <p className="text-danger">Please enter a name.</p>}
                        <button className="add-btn me-1" onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }}>Add {type}</button>
                        <button className="cancel-btn" onClick={onCloseModal}>Cancel</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddForm;