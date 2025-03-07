import React, { MouseEvent, useEffect, useState } from "react";
import Header from "@/components/Common/Header";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "@/components/Common/Footer";
import IMAGES from "@/assets/images/images";
import { FUNCTIONALITIES } from "@/utils/storage_const";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [image, setImage] = useState("");
  const [active, setActive] = useState("first");
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setActive(e.currentTarget.id);
  };

  const [margin, setMargin] = useState(250);
  useEffect(() => {
    handleScroll();
    if (scrollY >= 2200) {
      setImage(IMAGES.screenshot1);
    }
    if (scrollY < 1700) {
      setImage(IMAGES.screenshot2);
    }
    if (scrollY >= 1700 && scrollY < 2200) {
      setImage(IMAGES.screenshot3);
    }
    if (scrollY <= 2800) {
      setActive("first");
    }
    if (scrollY >= 200 && scrollY < 300) {
      setMargin(50);
    } else if (scrollY >= 300) {
      setMargin(0);
    } else {
      setMargin(250);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

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
  const active_bullet =
    "bg-[url('@/assets/images/arrow-down-up.svg')] bg-no-repeat bg-center animate-(--animate-scale) w-[40px] h-[40px] invert-[1] !bg-[#1effda] border-none left-[calc(50%-18px)]";
  return (
    <>
      <Header />
      <div className="h-fit bg-[#F9F2ED]">
        <div className="relative z-1 w-screen bg-[#F9F2ED] pt-[50px] text-center">
          <div className="col-sm-6 mx-auto">
            <h1 className="!text-[64px] !font-bold">
              Organize your work and life, finally.
            </h1>
            <p className="text-secondary text-[20px] font-bold">
              Become focused, organized, and calm with TodoList. The world’s #1
              task manager and to-do list app.
            </p>
            <Link to={"/login"}>
              <Button variant="danger" className="btn">
                Get Started
              </Button>
            </Link>
          </div>
          <img
            src={IMAGES.screenshot1}
            alt=""
            className="relative z-0 mx-auto mt-(--margin) w-[1200px] translate-y-[40px] rounded-[10px]"
            style={{ "--margin": margin + "px" } as React.CSSProperties}
          />
        </div>
        <div className="border-top border-bottom relative z-1 w-screen border-y-[#d1d1d1] bg-[#F9F2ED] py-[50px] text-center">
          <p>
            30 million+ people and teams trust their sanity and productivity to
            TodoList
          </p>
          <div className="col-sm-6 mx-auto flex">
            <div className="col-sm-6 h-[80px] bg-[url('@/assets/images/platforms1.png')] bg-[length:200px] !bg-[position:100%_0] bg-no-repeat" />
            <div className="col-sm-6 h-[80px] bg-[url('@/assets/images/platforms2.png')] bg-[length:200px] !bg-[position:0_0] bg-no-repeat" />
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="col-sm-8 mx-auto mt-[300px] text-start">
                <p className="text-bold mb-[30px] text-red-500">
                  Clear your mind
                </p>
                <h2 className="mb-[30px] !text-[36px] !font-bold">
                  The fastest way to get tasks out of your head.
                </h2>
                <h3 className="text-secondary !text-[20px] !leading-[30px]">
                  Type just about anything into the task field and TodoList’s
                  one-of-its-kind natural language recognition will instantly
                  fill your to-do list.
                </h3>
              </div>
              <div className="col-sm-8 mx-auto mt-[300px] text-start">
                <p className="text-bold mb-[30px] text-red-500">
                  Focus on what’s important
                </p>
                <h2 className="mb-[30px] !text-[36px] !font-bold">
                  Reach that mental clarity you’ve been longing for.
                </h2>
                <h3 className="text-secondary !text-[20px] !leading-[30px]">
                  Your tasks are automatically sorted into Today, Upcoming, and
                  custom Filter views to help you prioritize your most important
                  work.
                </h3>
              </div>
              <div className="col-sm-8 mx-auto mt-[300px] mb-[200px] text-start">
                <p className="text-bold mb-[30px] text-red-500">
                  Get it all done
                </p>
                <h2 className="mb-[30px] !text-[36px] !font-bold">
                  Where work and personal tasks can finally coexist.
                </h2>
                <h3 className="text-secondary !text-[20px] !leading-[30px]">
                  Tons of tasks, just one app. With workspaces, your personal,
                  work, and team tasks can all live harmoniously under the same
                  roof. (Sigh of relief).
                </h3>
              </div>
            </div>
            <div className="col-sm-6">
              <img
                src={image}
                alt=""
                className="col-sm-10 sticky top-[200px] z-0 mt-[180px] h-[350px] rounded-[20px] bg-black"
              />
            </div>
          </div>
          <div className="col-sm-6 mx-auto mb-[100px]">
            <h1 className="mb-[50px] !text-[45px] !font-bold">
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
              className="col-sm-4 mt-[180px] h-[300px] rounded-[20px] bg-transparent"
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
                className={`absolute mb-0 h-[64px] !w-[80px] bg-transparent bg-[url("@/assets/images/tag.png")] bg-[position:0_-15px] bg-no-repeat pt-[7px] pr-[10px] font-bold text-white opacity-60 ${
                  active === "fourth"
                    ? "bottom-0 bg-cover bg-[position:0_7px] pt-[32px]"
                    : `top-(--tag)`
                }`}
                style={
                  { "--tag": handleBulletPosition() } as React.CSSProperties
                }
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
                className={`${bullet} top-0 ${active === "first" ? active_bullet : "!border-red-500"}`}
                onClick={(e) => handleClick(e)}
              />
              <div
                id="second"
                className={`${bullet} top-[33%] ${
                  active === "second"
                    ? active_bullet
                    : active !== "first" && "!border-red-500"
                } `}
                onClick={(e) => handleClick(e)}
              />
              <div
                id="third"
                className={`${bullet} top-[66%] ${
                  active === "third"
                    ? active_bullet
                    : active === "fourth" && "!border-red-500"
                }`}
                onClick={(e) => handleClick(e)}
              />
              <div
                id="fourth"
                className={` ${bullet} bottom-0 ${active === "fourth" && active_bullet} `}
                onClick={(e) => handleClick(e)}
              />
            </div>
            <div className="col-sm-4">
              <ul className="p-0 align-middle">
                {active === "first"
                  ? FUNCTIONALITIES[0].map((func) => {
                      return (
                        <li
                          key={func}
                          className="mb-[10px] animate-(--animate-fadeIn) text-start"
                        >
                          {func}
                        </li>
                      );
                    })
                  : active === "second"
                    ? FUNCTIONALITIES[1].map((func) => {
                        return (
                          <li
                            key={func}
                            className="mb-[10px] animate-(--animate-fadeIn) text-start"
                          >
                            {func}
                          </li>
                        );
                      })
                    : active === "third"
                      ? FUNCTIONALITIES[2].map((func) => {
                          return (
                            <li
                              key={func}
                              className="mb-[10px] animate-(--animate-fadeIn) text-start"
                            >
                              {func}
                            </li>
                          );
                        })
                      : FUNCTIONALITIES[3].map((func) => {
                          return (
                            <li
                              key={func}
                              className="mb-[10px] animate-(--animate-fadeIn) text-start"
                            >
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
      </div>
      <Footer />
    </>
  );
}

export default Home;
