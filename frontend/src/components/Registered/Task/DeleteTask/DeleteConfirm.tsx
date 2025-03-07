import { Button } from "react-bootstrap";

interface Props {
  type: string;
  onCloseModal: () => void;
  onConfirm: () => void;
}

function DeleteConfirm({ type, onCloseModal, onConfirm }: Props) {
  return (
    <div className="absolute z-1 h-full w-full bg-[#b8b8b86a]">
      <div className="absolute top-[50%] left-[calc(50%-300px)] z-2 h-fit w-[600px] translate-y-[-50%] rounded-[10px] bg-white p-[20px]">
        <h2>Confirm</h2>
        <p className="mb-5">Are you sure you want to delete this {type}?</p>
        <div className="text-end">
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
          <Button
            variant="outline-secondary"
            className="ms-2"
            onClick={onCloseModal}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
