import { MouseEvent, useEffect, useState } from "react";
import Header from "@/components/Common/Header";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Footer from "@/components/Common/Footer";
import IMAGES from "@/assets/images/images";


function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [image, setImage] = useState("");
    const [active, setActive] = useState("first");
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        setActive(e.currentTarget.id);
    }
    const functionalities = [
        ["Add a task", "Complete it"],
        ["Add a task", "Give it a due date", "Complete a task"],
        ["Add a task", "Move tasks into projects", "Complete tasks"],
        ["Add a task", "Move tasks into projects", "Add some extensions", "Filter tasks", "Complete tasks"]
    ];
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
        if(scrollY >= 200 && scrollY < 300){
            setMargin(50);
        }else if (scrollY >= 300){
            setMargin(0);
        }else{
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
            <div className="home-container">
                <div className="section-container">
                    <div className="title-container col-sm-6">
                        <h1 className="section-title">Organize your work and life, finally.</h1>
                        <p className="text-secondary section-subtitle">Become focused, organized, and calm with TodoList. The world’s #1 task manager and to-do list app.</p>
                        <Link to={'/login'}><Button variant="danger" className="btn">Get Started</Button></Link>
                    </div>
                    <img src={IMAGES.screenshot1} alt="" className="main-pic" style={{"--margin": margin + "px"} as React.CSSProperties}/>
                </div>
                <div className="section-container">
                    <p>30 million+ people and teams trust their sanity and productivity to TodoList</p>
                    <div className="platforms col-sm-6">
                        <div className="platform-img1 col-sm-6" />
                        <div className="platform-img2 col-sm-6" />
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="product-desc col-sm-8">
                                <p>Clear your mind</p>
                                <h2>The fastest way to get tasks out of your head.</h2>
                                <h3 className="text-secondary">Type just about anything into the task field and TodoList’s one-of-its-kind natural language recognition will instantly fill your to-do list.</h3>
                            </div>
                            <div className="product-desc col-sm-8">
                                <p>Focus on what’s important</p>
                                <h2>Reach that mental clarity you’ve been longing for.</h2>
                                <h3 className="text-secondary">Your tasks are automatically sorted into Today, Upcoming, and custom Filter views to help you prioritize your most important work.</h3>
                            </div>
                            <div className="product-desc col-sm-8">
                                <p>Get it all done</p>
                                <h2>Where work and personal tasks can finally coexist.</h2>
                                <h3 className="text-secondary">Tons of tasks, just one app. With workspaces, your personal, work, and team tasks can all live harmoniously under the same roof. (Sigh of relief).</h3>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src={image} alt="" className="img-container col-sm-10" />
                        </div>
                    </div>
                    <div className="sub-section col-sm-6">
                        <h1>“TodoList makes it easy to go as simple or as complex as you want”</h1>
                        <h2>-The ASD</h2>
                    </div>
                    <p className="level text-muted">Simple</p>
                    <div className="row function-detail">
                        <img src={(active === "fourth" || active === "third") ? IMAGES.screenshot4 : IMAGES.screenshot2} alt="" className="img-container2 col-sm-4" />
                        <div className="col-sm-2 progress-bar">
                            <div className="vr-line" />
                            <div className={"red-line " + active + "-line"} />
                            <p className={"bullet-tag " + active}>{active === "first" ? "Ease in"
                            :
                            active === "second" ? "Organize"
                            :
                            active === "third" ? "Delegate" : "Customize"}</p>
                            <div id="first"
                                className={active === "first" ? "bullet first active-bullet" : "bullet first passed"}
                                onClick={(e) => handleClick(e)} />
                            <div id="second"
                                className={active === "second" ?
                                    "bullet second active-bullet"
                                    :
                                    active !== "first" ? "bullet second passed" : "bullet second"}
                                onClick={(e) => handleClick(e)} />
                            <div id="third"
                                className={active === "third" ?
                                    "bullet third active-bullet"
                                    :
                                    active !== "fourth" ? "bullet third" : "bullet third passed"}
                                onClick={(e) => handleClick(e)} />
                            <div id="fourth"
                                className={active === "fourth" ? "bullet fourth active-bullet" : "bullet fourth"}
                                onClick={(e) => handleClick(e)} />
                        </div>
                        <div className="col-sm-4">
                            <ul>
                                {active === "first" ?
                                    functionalities[0].map(func => {
                                        return (
                                            <li key={func}>{func}</li>
                                        )
                                    })
                                    :
                                    active === "second" ?
                                        functionalities[1].map(func => {
                                            return (
                                                <li key={func}>{func}</li>
                                            )
                                        })
                                        :
                                        active === "third" ?
                                            functionalities[2].map(func => {
                                                return (
                                                    <li key={func}>{func}</li>
                                                )
                                            })
                                            :
                                            functionalities[3].map(func => {
                                                return (
                                                    <li key={func}>{func}</li>
                                                )
                                            })
                                }
                            </ul>
                        </div>
                    </div>
                    <p className="level text-muted">Advanced</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;