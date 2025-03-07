interface Props {
  point: { x: number; y: number };
  handleShow: () => void;
}

function CustomContextMenu({ point, handleShow }: Props) {
  return (
    <div
      className="border-box absolute top-(--pointY) left-(--pointX) !z-99 w-[150px] rounded-[10px] bg-white"
      style={
        {
          "--pointX": point.x + "px",
          "--pointY": point.y + "px",
        } as React.CSSProperties
      }
    >
      <button
        className="text-danger mb-0 w-full !rounded-[10px] !bg-white bg-[url('@/assets/images/delete.png')] bg-[position:10px_13px] bg-no-repeat py-[10px] pr-[10px] pl-[40px] !leading-[25px] duration-[.1s] ease-in-out hover:!bg-[#e3e3e3]"
        onClick={() => {
          handleShow();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default CustomContextMenu;
