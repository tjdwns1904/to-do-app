import IMAGES from "@/assets/images/images";
import { Link } from "react-router-dom";

const INSTAGRAM = "https://www.instagram.com/tjdwns99/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100008141106316";
const GITHUB = "https://github.com/tjdwns1904";
const LINKEDIN = "https://www.linkedin.com/in/seongjoon-hong-193a742b9/";

function Footer() {
  return (
    <div className="flex justify-between p-[40px] pb-[10px]">
      <div>
        <div className="flex">
          <img className="h-[100px] w-[100px]" src={IMAGES.logo} alt="" />
          <h2 className="!leading-[90px] !font-bold">TodoList</h2>
        </div>
        <p className="pl-[40px] text-[20px]">
          Join millions of people who organize
          <br /> work and life with TodoList.
        </p>
        <div className="mt-[50px] flex p-[20px] pl-[40px] text-[12px] font-bold text-gray-500">
          <p>Security</p>
          <p className="before:mx-[10px] before:content-['|'] after:mx-[10px] after:content-['|']">
            Privacy
          </p>
          <p>Terms</p>
          <p className="ml-[50px]">ⓒ SJ</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link
          to={LINKEDIN}
          target="_blank"
          className="mb-[5px] w-[42px] duration-[.2s] ease-in-out content-[url('@/assets/images/linkedin.png')] hover:invert-[1]"
        />
        <Link
          to={INSTAGRAM}
          target="_blank"
          className="w-[50px] duration-[.2s] ease-in-out content-[url('@/assets/images/ig.png')] hover:invert-[1]"
        />
        <Link
          to={FACEBOOK}
          target="_blank"
          className="w-[50px] duration-[.2s] ease-in-out content-[url('@/assets/images/fb.png')] hover:invert-[1]"
        />
        <Link
          to={GITHUB}
          target="_blank"
          className="mt-[7px] w-[40px] duration-[.2s] ease-in-out content-[url('@/assets/images/github.png')] hover:invert-[1]"
        />
      </div>
    </div>
  );
}

export default Footer;
