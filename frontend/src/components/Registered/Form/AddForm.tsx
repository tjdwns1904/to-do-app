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
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setName(e.target.value);

  return (
    <>
      {isLoading && <LoadingPage />}
      <div
        className="absolute z-3 h-full w-full bg-[#b8b8b86a]"
        onClick={onCloseModal}
      ></div>
      <div className="absolute top-[50%] left-[calc(50%-300px)] z-4 h-fit w-[600px] translate-y-[-50%] rounded-[10px] bg-white p-[20px]">
        <h2 className="!mb-[20px] !text-[26px] !font-black">Add {type}</h2>
        <Form>
          <Form.Control
            value={name}
            onChange={(e) => handleChange(e)}
            placeholder="Name"
          />
          <div className="mt-5">
            {!isValid && <p className="text-danger">Please enter a name.</p>}
            <button
              className="me-1 !rounded-[5px] !border !border-transparent !bg-[#3882f0] px-[10px] py-[5px] text-white duration-[.2s] ease-in-out hover:!bg-[#3085C3]"
              onClick={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
            >
              Add {type}
            </button>
            <button
              className="!rounded-[5px] border border-[#bbbbbb] bg-white px-[10px] py-[5px] duration-[.2s] ease-in-out hover:!border-black"
              onClick={onCloseModal}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddForm;
