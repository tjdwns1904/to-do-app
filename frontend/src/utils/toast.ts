import { toast, ToastOptions, Bounce } from 'react-toastify';

const defaultOption: ToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    className: "text-sm text-black",
}

type CustomToast = {
    success: (msg: string) => void;
    error: (msg: string) => void;
}

const customToast: CustomToast = {
    success: (msg: string) => {
        toast.success(msg, defaultOption);
    },
    error: (msg: string) => {
        toast.error(msg, defaultOption);
    }
}

export default customToast;