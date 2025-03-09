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
    if (scrollY >= 2000) {
      setImage(IMAGES.screenshot1);
    }
    if (scrollY < 1500) {
      setImage(IMAGES.screenshot2);
    }
    if (scrollY >= 1500 && scrollY < 2000) {
      setImage(IMAGES.screenshot3);
    }
    if (scrollY <= 2500) {
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
  const activeBullet =
    "bg-[url('@/assets/images/arrow-down-up.svg')] bg-no-repeat bg-center animate-(--animate-scale) w-[40px] h-[40px] invert-[1] !bg-[#1effda] border-none left-[calc(50%-18px)]";
  const listStyle =
    "before:content-[url('@/assets/images/check-mark.png')] before:inline-block before:w-[20px] before:h-[20px] before:mr-[2px] mb-[10px] animate-(--animate-fadeIn) text-start";
  return (
    <>
      <Header />
      <div className="h-fit bg-[#F9F2ED]">
        <div className="relative z-1 w-screen bg-[#F9F2ED] pt-[50px] text-center">
          <div className="col-sm-6 mx-auto">
            <h1 className="!mb-[30px] !text-[40px] !font-bold lg:!mb-[10px] lg:!text-[64px]">
              Organize your work and life, finally.
            </h1>
            <p className="text-secondary text-lg font-bold lg:text-xl">
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
              <div className="col-sm-8 mx-auto mt-[250px] text-start lg:mt-[300px]">
                <p className="text-bold mb-[30px] text-sm text-red-500 lg:text-base">
                  Clear your mind
                </p>
                <h2 className="mb-[30px] !text-[28px] !font-bold lg:!text-4xl">
                  The fastest way to get tasks out of your head.
                </h2>
                <h3 className="text-secondary !text-lg !leading-[30px] lg:!text-xl">
                  Type just about anything into the task field and TodoList’s
                  one-of-its-kind natural language recognition will instantly
                  fill your to-do list.
                </h3>
              </div>
              <div className="col-sm-8 mx-auto mt-[250px] text-start lg:mt-[300px]">
                <p className="text-bold mb-[30px] text-sm text-red-500 lg:text-base">
                  Focus on what’s important
                </p>
                <h2 className="mb-[30px] !text-[28px] !font-bold lg:!text-4xl">
                  Reach that mental clarity you’ve been longing for.
                </h2>
                <h3 className="text-secondary !text-lg !leading-[30px] lg:!text-xl">
                  Your tasks are automatically sorted into Today, Upcoming, and
                  custom Filter views to help you prioritize your most important
                  work.
                </h3>
              </div>
              <div className="col-sm-8 mx-auto mt-[250px] mb-[100px] text-start lg:mt-[300px]">
                <p className="text-bold mb-[30px] text-sm text-red-500 lg:text-base">
                  Get it all done
                </p>
                <h2 className="mb-[30px] !text-[28px] !font-bold lg:!text-4xl">
                  Where work and personal tasks can finally coexist.
                </h2>
                <h3 className="text-secondary !text-lg !leading-[30px] lg:!text-xl">
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
                className="col-sm-10 sticky top-[200px] z-0 mt-[180px] max-h-[550px] rounded-[20px] bg-black"
              />
            </div>
          </div>
          <div className="col-sm-6 mx-auto my-[100px]">
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
                className={`absolute left-[-40px] mb-0 h-[64px] !w-[80px] pt-[7px] font-bold text-black opacity-60 lg:left-0 lg:pl-[20px] ${
                  active === "fourth" ? "bottom-0 pt-[30px]" : `top-(--tag)`
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
      </div>
      <Footer />
    </>
  );
}

export default Home;
