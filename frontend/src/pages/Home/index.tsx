import React, { MouseEvent, useEffect, useState } from "react";
import Header from "@/components/Common/Header";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "@/components/Common/Footer";
import IMAGES from "@/assets/images/images";
import LazyComponent from "@/components/Common/LazyComponent";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [image, setImage] = useState("");
  const [active, setActive] = useState("first");
  const [margin, setMargin] = useState(250);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setActive(e.currentTarget.id);
  };

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
          <LazyComponent
            component={() => import("./_components/HomeSection2")}
            skeleton={<></>}
            height={1684}
            margin={250}
            props={{ image }}
          />
          <LazyComponent
            component={() => import("./_components/HomeSection3")}
            skeleton={<></>}
            height={670}
            props={{ active, handleClick }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
