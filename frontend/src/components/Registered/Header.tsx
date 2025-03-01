import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IMAGES from "@/assets/images/images";
import CustomContextMenu from "./ContextMenu/CustomContextMenu";
import DeleteConfirm from "./Task/DeleteTask/DeleteConfirm";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import useModal from "@/hooks/useModal";
import { useDeleteProject } from "@/hooks/useDeleteProject";
import { useDeleteTag } from "@/hooks/useDeleteTag";
import { useLogout } from "../../services/useLogout";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    isMenuShown: boolean;
    setIsMenuShown: (isShown: boolean) => void;
}

function Header({ isMenuShown, setIsMenuShown }: Props) {
    const [point, setPoint] = useState({
        x: 0,
        y: 0
    });
    const [selected, setSelected] = useState({
        type: "",
        name: ""
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isProjectCollapsed, setIsProjectCollapsed] = useState(false);
    const [isTagCollapsed, setIsTagCollapsed] = useState(false);
    const handleProjectToggle = () => setIsProjectCollapsed(prev => !prev);
    const handleTagToggle = () => setIsTagCollapsed(prev => !prev);
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const [_, setUser] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: tags, refetch: refetchTags } = useGetTags(user.id, {
        queryKey: ["tags", user.id],
        staleTime: 1000 * 60 * 5,
    });
    const { data: projects, refetch: refetchProjects } = useGetProjects(user.id, {
        queryKey: ["projects", user.id],
        staleTime: 1000 * 60 * 5
    });
    const { mutate: logout } = useLogout({
        onSuccess: () => {
            queryClient.clear();
            setUser(INITIAL_USER_VALUE);
            navigate("/", { replace: true });
        },
        onError: (error) => {
            console.log(error);
        },
    })
    const {
        open: openDeleteConfirmModal,
        close: closeDeleteConfirmModal,
        Modal: DeleteConfirmModal
    } = useModal({ children: DeleteConfirm });
    const { mutate: deleteProject } = useDeleteProject({
        onSuccess: () => {
            refetchProjects();
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            closeDeleteConfirmModal();
        }
    });
    const { mutate: deleteTag } = useDeleteTag({
        onSuccess: () => {
            refetchTags();
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            closeDeleteConfirmModal();
        }
    });
    const handleDeleteItem = () => {
        if (selected.type === "tag") {
            deleteTag({ userID: user.id, name: selected.name });
        } else if (selected.type === "project") {
            deleteProject({ userID: user.id, name: selected.name });
        }
    }
    const handleLogout = () => {
        logout();
    }
    return (
        <>
            <DeleteConfirmModal onConfirm={handleDeleteItem} type={selected.type} />
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
                    {isMenuShown && <CustomContextMenu point={point} handleShow={openDeleteConfirmModal} />}
                </div>
                <button className="signout-btn" onClick={handleLogout}>Sign out</button>
            </div>
        </>
    )
}

export default Header;