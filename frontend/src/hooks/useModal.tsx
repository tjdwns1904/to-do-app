import { ComponentType, useState } from "react";

interface HookProps<P> {
    children: ComponentType<ModalContentProps<P>>
}

type ModalContentProps<P> = P & {
    onCloseModal: () => void;
}

const useModal = <P extends Object>({
    children: ChildComponent
}: HookProps<P>) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const Modal = (props: Omit<P, "onCloseModal">) => {
        return (
            <>
                {open &&
                    <>
                        <div className="background" onClick={handleClose} />
                        <ChildComponent {...(props as P)} onCloseModal={handleClose} />
                    </>
                }
            </>
        )
    }

    return { open: handleOpen, close: handleClose, Modal }
}

export default useModal;