import { Link } from "react-router-dom";
import IMAGES from "@/assets/images/images";

function Header() {
  return (
    <>
      <div className="sticky top-0 z-3 flex h-[100px] items-center justify-between bg-white px-[40px]">
        <Link to={"/"}>
          <img className="h-[100px] w-[100px]" src={IMAGES.logo} alt="" />
        </Link>
        <div className="authenticate">
          <Link
            to={"/login"}
            className="rounded-[12px] pt-[6px] pr-[20px] pb-[8px] pl-[20px] text-black !no-underline duration-[.2s] ease-in-out hover:bg-[#dddddd]"
          >
            Sign in
          </Link>
          |
          <Link
            to={"/signup"}
            className="rounded-[12px] pt-[6px] pr-[20px] pb-[8px] pl-[20px] text-black !no-underline duration-[.2s] ease-in-out hover:bg-[#dddddd]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
