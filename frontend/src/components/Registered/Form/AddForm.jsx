import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoadingPage from "../../Common/LoadingPage";

function AddForm({ type, user, getTags, getProjects, handleClose }) {
    const [ name, setName ] = useState("");
    const [ isValid, setIsValid ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const addData = () => {
        if(name !== ""){
            setIsLoading(true);
            setIsValid(true);
            if(type === "tag"){
                axios.post("http://localhost:3000/tag/add", {
                    id: user.id,
                    tag: name
                })
                .then(res => {
                    if(res.data.msg){
                        handleClose();
                        getTags();
                    }else{
                        console.log(res.data.err);
                    }
                })
                .finally(() => setIsLoading(false));
            }else{
                axios.post("http://localhost:3000/project/add", {
                    id: user.id,
                    project: name
                })
                .then(res => {
                    if(res.data.msg){
                        handleClose();
                        getProjects();
                    }else{
                        console.log(res.data.err);
                    }
                })
                .finally(() => setIsLoading(false));
            }
        }else{
            setIsValid(false);
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
    }
    return (
        <>
            {isLoading && <LoadingPage/>}
            <div className="background upper-layer" onClick={handleClose}>
            </div>
            <div className="modal-container upper-layer">
                <h2>Add {type}</h2>
                <Form>
                    <Form.Control value={name} onChange={(e) => handleChange(e)} placeholder="Name"/>
                    <div className="mt-5">
                        {!isValid && <p className="text-danger">Please enter a name.</p>}
                        <button className="add-btn me-1" onClick={(e) => {
                            e.preventDefault();
                            addData();
                        }}>Add {type}</button>
                        <button className="cancel-btn" onClick={handleClose}>Cancel</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddForm;