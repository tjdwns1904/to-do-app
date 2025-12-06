import { Form } from "react-bootstrap";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  type: string;
  onCloseModal: () => void;
  onConfirm: (item: string) => void;
}
const schema = z.object({
  name: z.string().min(1, "Please enter a name."),
});

export type AddItemForm = z.infer<typeof schema>;

function AddForm({ type, onCloseModal, onConfirm }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleConfirm = (item: AddItemForm) => {
    onConfirm(item.name);
  };

  return (
    <>
      <div
        className="absolute z-3 h-full w-full bg-[#b8b8b86a]"
        onClick={onCloseModal}
      ></div>
      <div className="absolute top-[50%] left-[calc(50%-300px)] z-4 h-fit w-[600px] translate-y-[-50%] rounded-[10px] bg-white p-[20px]">
        <h2 className="!mb-[20px] !text-[26px] !font-black">Add {type}</h2>
        <Form onSubmit={handleSubmit(handleConfirm)}>
          <Form.Control {...register("name")} placeholder="Name" />
          <div className="mt-5">
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
            <button
              className="me-1 !rounded-[5px] !border !border-transparent !bg-[#3882f0] px-[10px] py-[5px] text-white duration-[.2s] ease-in-out hover:!bg-[#3085C3]"
              type="submit"
            >
              Add {type}
            </button>
            <button
              className="!rounded-[5px] !border !border-[#bbbbbb] bg-white px-[10px] py-[5px] duration-[.2s] ease-in-out hover:!border-black"
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
