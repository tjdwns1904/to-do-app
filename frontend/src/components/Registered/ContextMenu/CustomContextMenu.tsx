function CustomContextMenu({ point, handleShow } : {point: {x: number, y: number}, handleShow: () => void}){
    return(
        <div className="menu-container" style={{'--pointX': point.x + "px", '--pointY': point.y + "px"}}>
            <p className="remove-btn text-danger" onClick={() => {
                handleShow();
            }}>Delete</p>
        </div>
    )
}

export default CustomContextMenu;