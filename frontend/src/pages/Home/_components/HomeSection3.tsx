import { MouseEvent } from "react";
import { FUNCTIONALITIES } from "@/utils/storage_const";
import IMAGES from "@/assets/images/images";

interface Props {
  active: string;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

function HomeSection3({ active, handleClick }: Props) {
  const handleBulletPosition = () => {
    if (active === "second") {
      return "33%";
    } else if (active === "third") {
      return "66%";
    } else if (active === "fourth") {
      return "100%";
    } else {
      return "0%";
    }
  };
  const bullet =
    "w-[15px] h-[15px] bg-white border-3 border-[#b8b8b8] rounded-full absolute left-[calc(50%-6px)] z-2 cursor-grab";
  const activeBullet =
    "bg-[url('@/assets/images/arrow-down-up.svg')] bg-no-repeat bg-center animate-(--animate-scale) w-[40px] h-[40px] invert-[1] !bg-[#1effda] border-none left-[calc(50%-18px)]";
  const listStyle =
    "before:content-[url('@/assets/images/check-mark.png')] before:inline-block before:w-[20px] before:h-[20px] before:mr-[2px] mb-[10px] animate-(--animate-fadeIn) text-start";

  return (
    <div>
      <div className="col-sm-6 mx-auto">
        <h1 className="mb-[50px] !font-bold lg:!text-[45px]">
          “TodoList makes it easy to go as simple or as complex as you want”
        </h1>
      </div>
      <p className="text-muted mx-auto w-fit rounded-[10px] bg-[#e3e3e3] px-[10px] py-[5px]">
        Simple
      </p>
      <div className="row items-center justify-center">
        <img
          src={
            active === "fourth" || active === "third"
              ? IMAGES.screenshot4
              : IMAGES.screenshot2
          }
          alt=""
          className="col-sm-4 mt-[180px] max-h-[300px] rounded-[20px] bg-transparent"
        />
        <div className="col-sm-2 relative mx-[60px] h-[400px]">
          <div className="absolute top-0 left-[50%] !z-0 h-full w-[3px] bg-[#b8b8b8]" />
          <div
            className={`absolute top-0 left-[50%] !z-1 h-(--bullet) w-[3px] !bg-red-500`}
            style={
              { "--bullet": handleBulletPosition() } as React.CSSProperties
            }
          />
          <p
            className={`absolute left-[-40px] mb-0 h-[64px] !w-[80px] pt-[7px] font-bold text-black opacity-60 lg:left-[-10px] xl:pl-[40px] ${
              active === "fourth" ? "bottom-0 pt-[30px]" : `top-(--tag)`
            }`}
            style={{ "--tag": handleBulletPosition() } as React.CSSProperties}
          >
            {active === "first"
              ? "Ease in"
              : active === "second"
                ? "Organize"
                : active === "third"
                  ? "Delegate"
                  : "Customize"}
          </p>
          <div
            id="first"
            className={`${bullet} top-0 ${active === "first" ? activeBullet : "!border-red-500"}`}
            onClick={(e) => handleClick(e)}
          />
          <div
            id="second"
            className={`${bullet} top-[33%] ${
              active === "second"
                ? activeBullet
                : active !== "first" && "!border-red-500"
            } `}
            onClick={(e) => handleClick(e)}
          />
          <div
            id="third"
            className={`${bullet} top-[66%] ${
              active === "third"
                ? activeBullet
                : active === "fourth" && "!border-red-500"
            }`}
            onClick={(e) => handleClick(e)}
          />
          <div
            id="fourth"
            className={` ${bullet} bottom-0 ${active === "fourth" && activeBullet} `}
            onClick={(e) => handleClick(e)}
          />
        </div>
        <div className="col-sm-4">
          <ul className="p-0 align-middle">
            {active === "first"
              ? FUNCTIONALITIES[0].map((func) => {
                  return (
                    <li key={func} className={listStyle}>
                      {func}
                    </li>
                  );
                })
              : active === "second"
                ? FUNCTIONALITIES[1].map((func) => {
                    return (
                      <li key={func} className={listStyle}>
                        {func}
                      </li>
                    );
                  })
                : active === "third"
                  ? FUNCTIONALITIES[2].map((func) => {
                      return (
                        <li key={func} className={listStyle}>
                          {func}
                        </li>
                      );
                    })
                  : FUNCTIONALITIES[3].map((func) => {
                      return (
                        <li key={func} className={listStyle}>
                          {func}
                        </li>
                      );
                    })}
          </ul>
        </div>
      </div>
      <p className="text-muted !mx-auto !mt-[16px] mb-0 w-fit rounded-[10px] bg-[#e3e3e3] px-[10px] py-[5px]">
        Advanced
      </p>
    </div>
  );
}

export default HomeSection3;
