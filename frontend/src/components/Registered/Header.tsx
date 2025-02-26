import { useState } from "react";
import { NavLink } from "react-router-dom";
import IMAGES from "@/assets/images/images";
import CustomContextMenu from "./ContextMenu/CustomContextMenu";
import axios from "axios";
import DeleteConfirm from "./Task/DeleteTask/DeleteConfirm";
import LoadingPage from "@/pages/LoadingPage";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";

function Header({ getProjects, getTags, isMenuShown, setIsMenuShown }) {
    const [point, setPoint] = useState({
        x: 0,
        y: 0
    });
    const [selected, setSelected] = useState({
        type: "",
        name: ""
    });
    const [isProjectCollapsed, setIsProjectCollapsed] = useState(false);
    const [isTagCollapsed, setIsTagCollapsed] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleShow = () => setIsShown(true);
    const handleClose = () => setIsShown(false);
    const handleProjectToggle = () => setIsProjectCollapsed(prev => !prev);
    const handleTagToggle = () => setIsTagCollapsed(prev => !prev);
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: tags } = useGetTags(user.id, {
        queryKey: ["tags", user.id],
        staleTime: 1000 * 60 * 5,
    });
    const { data: projects } = useGetProjects(user.id, {
        queryKey: ["projects", user.id],
        staleTime: 1000 * 60 * 5
    });
    const logout = () => {
        fetch('http://localhost:3000/auth/logout', {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.msg === "Logged out succesfully!") {
                    window.location.href = "/";
                }
            })
    }
    const handleDelete = () => {
        setIsLoading(true);
        if (selected.type === "tag") {
            axios.post("http://localhost:3000/tag/delete", {
                userId: user.id,
                tag: selected.name
            })
                .then(res => {
                    if (res.data.msg) {
                        alert(res.data.msg);
                        getTags();
                    } else {
                        console.log(res.data.err);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsMenuShown(false);
                    handleClose();
                })
        } else {
            axios.post("http://localhost:3000/project/delete", {
                userId: user.id,
                project: selected.name
            })
                .then(res => {
                    if (res.data.msg) {
                        alert(res.data.msg);
                        getProjects();
                    } else {
                        console.log(res.data.err);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsMenuShown(false);
                    handleClose();
                })
        }
    }
    return (
        <>
            {isLoading && <LoadingPage />}
            {isShown && <DeleteConfirm handleClose={handleClose} handleDelete={handleDelete} type={selected.type} />}
            <div className="user-header-container" onClick={() => setIsMenuShown(false)}>
                <div>
                    <div className="profile-container">
                        <img src={IMAGES.profile} alt="" />
                        <p>{user.username}</p>
                    </div>
                    <NavLink to={'/'} className={({ isActive }) => (isActive) ? "active header-link inbox-link" : "header-link inbox-link"}>Inbox</NavLink>
                    <NavLink to={'/today'} className={({ isActive }) => (isActive) ? "active header-link today-link" : "header-link today-link"}>Today</NavLink>
                    <NavLink to={'/upcoming'} className={({ isActive }) => (isActive) ? "active header-link upcoming-link" : "header-link upcoming-link"}>Upcoming</NavLink>
                    {projects && projects.length !== 0 &&
                        <div className="list-container">
                            <p className="list-title" onClick={handleProjectToggle}>Projects</p>
                            <div className={isProjectCollapsed ? "list-shown" : "list-hidden"} onClick={handleProjectToggle} />
                            {isProjectCollapsed && projects.map(project => {
                                return (
                                    <NavLink key={project.id} to={'/filter/project/' + project.name} className={({ isActive }) => (isActive) ? "active sub-list-link list-item" : "sub-list-link list-item"}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            setIsMenuShown(true);
                                            setPoint({ x: e.clientX, y: e.clientY });
                                            setSelected({ type: "project", name: project.name });
                                        }}
                                    >
                                        {project.name}
                                    </NavLink>
                                )
                            })}
                        </div>
                    }
                    {tags && tags.length !== 0 &&
                        <div className="list-container">
                            <p className="list-title" onClick={handleTagToggle}>Tags</p>
                            <div className={isTagCollapsed ? "list-shown" : "list-hidden"} onClick={handleTagToggle} />
                            {isTagCollapsed && tags.map(tag => {
                                return (
                                    <NavLink key={tag.id} to={'/filter/tag/' + tag.name} className={({ isActive }) => (isActive) ? "active sub-list-link list-item" : "sub-list-link list-item"}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            setIsMenuShown(true);
                                            setPoint({ x: e.clientX, y: e.clientY });
                                            setSelected({ type: "tag", name: tag.name });
                                        }}
                                    >
                                        {tag.name}
                                    </NavLink>
                                )
                            })}
                        </div>
                    }
                    {isMenuShown && <CustomContextMenu point={point} selected={selected} handleShow={handleShow} />}
                </div>
                <button className="signout-btn" onClick={logout}>Sign out</button>
            </div>
        </>
    )
}

export default Header;