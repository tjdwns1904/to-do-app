import React from "react";

function CustomContextMenu({ point, handleShow }){
    return(
        <div className="menu-container" style={{'--pointX': point.x + "px", '--pointY': point.y + "px"}}>
            <p className="remove-btn text-danger" onClick={() => {
                handleShow();
            }}>Delete</p>
        </div>
    )
}

export default CustomContextMenu;