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
    y: 0,
  });
  const [selected, setSelected] = useState({
    type: "",
    name: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isProjectCollapsed, setIsProjectCollapsed] = useState(false);
  const [isTagCollapsed, setIsTagCollapsed] = useState(false);
  const handleProjectToggle = () => setIsProjectCollapsed((prev) => !prev);
  const handleTagToggle = () => setIsTagCollapsed((prev) => !prev);
  const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
  const [_, setUser] = useSessionStorage("user", INITIAL_USER_VALUE);
  const { data: tags, refetch: refetchTags } = useGetTags(user.id, {
    queryKey: ["tags", user.id],
    staleTime: 1000 * 60 * 5,
  });
  const { data: projects, refetch: refetchProjects } = useGetProjects(user.id, {
    queryKey: ["projects", user.id],
    staleTime: 1000 * 60 * 5,
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
  });
  const {
    open: openDeleteConfirmModal,
    close: closeDeleteConfirmModal,
    Modal: DeleteConfirmModal,
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
    },
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
    },
  });
  const handleDeleteItem = () => {
    if (selected.type === "tag") {
      deleteTag({ userID: user.id, name: selected.name });
    } else if (selected.type === "project") {
      deleteProject({ userID: user.id, name: selected.name });
    }
  };
  const handleLogout = () => {
    logout();
  };

  const header_link =
    "block mb-[5px] text-black rounded-[8px] !no-underline hover:!bg-[#e9e9e9] duration-[.2s] ease-in-out";
  const active_link = "!text-blue-700 !bg-[#f1f1f1]";

  return (
    <>
      <DeleteConfirmModal onConfirm={handleDeleteItem} type={selected.type} />
      <div
        className="sticky top-0 flex h-screen w-[300px] flex-col justify-between bg-[#f9f9f9] p-[20px]"
        onClick={() => setIsMenuShown(false)}
      >
        <div>
          <div className="mb-[50px] flex">
            <img src={IMAGES.profile} alt="" />
            <p className="mb-0 ml-[15px] text-[18px] font-bold">
              {user.username}
            </p>
          </div>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? `${active_link} ${header_link} bg-transparent bg-[url('@/assets/images/inbox.png')] bg-[position:10px_10px] bg-no-repeat px-[50px] py-[10px]`
                : `bg-transparent bg-[url('@/assets/images/inbox.png')] bg-[position:10px_10px] bg-no-repeat px-[50px] py-[10px] ${header_link}`
            }
          >
            Inbox
          </NavLink>
          <NavLink
            to={"/today"}
            className={({ isActive }) =>
              isActive
                ? `${active_link} ${header_link} bg-transparent bg-[url(@/assets/images/calendar.png)] bg-[position:10px_10px] bg-no-repeat px-[50px] py-[10px]`
                : `bg-transparent bg-[url(@/assets/images/calendar.png)] bg-[position:10px_10px] bg-no-repeat px-[50px] py-[10px] ${header_link}`
            }
          >
            Today
          </NavLink>
          <NavLink
            to={"/upcoming"}
            className={({ isActive }) =>
              isActive
                ? `${active_link} ${header_link} bg-transparent bg-[url(@/assets/images/upcoming.png)] bg-[position:10px_10px] bg-no-repeat px-[50px] py-[10px]`
                : `bg-transparent bg-[url(@/assets/images/upcoming.png)] bg-[position:10px_10px] bg-no-repeat px-[50px] py-[10px] ${header_link}`
            }
          >
            Upcoming
          </NavLink>
          {projects && projects.length !== 0 && (
            <div className="relative">
              <p
                className="mb-[10px] pt-[15px] pr-[10px] pb-0 pl-[10px] font-bold"
                onClick={handleProjectToggle}
              >
                Projects
              </p>
              <div
                className={`absolute top-[20px] right-0 h-[16px] w-[16px] bg-[url('@/assets/images/down-arrow.png')] bg-center bg-no-repeat ${isProjectCollapsed && "rotate-[180deg] animate-(--animate-rotate)"}`}
                onClick={handleProjectToggle}
              />
              {isProjectCollapsed &&
                projects.map((project) => {
                  return (
                    <NavLink
                      key={project.id}
                      to={`/project/${project.name}`}
                      className={({ isActive }) =>
                        isActive
                          ? `${active_link} ${header_link} px-[20px] py-[5px]`
                          : `${header_link} px-[20px] py-[5px]`
                      }
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setIsMenuShown(true);
                        setPoint({ x: e.clientX, y: e.clientY });
                        setSelected({ type: "project", name: project.name });
                      }}
                    >
                      {project.name}
                    </NavLink>
                  );
                })}
            </div>
          )}
          {tags && tags.length !== 0 && (
            <div className="relative">
              <p
                className="mb-[10px] pt-[15px] pr-[10px] pb-0 pl-[10px] font-bold"
                onClick={handleTagToggle}
              >
                Tags
              </p>
              <div
                className={`absolute top-[20px] right-0 h-[16px] w-[16px] bg-[url('@/assets/images/down-arrow.png')] bg-center bg-no-repeat ${isTagCollapsed && "rotate-[180deg] animate-(--animate-rotate)"}`}
                onClick={handleTagToggle}
              />
              {isTagCollapsed &&
                tags.map((tag) => {
                  return (
                    <NavLink
                      key={tag.id}
                      to={`/tag/${tag.name}`}
                      className={({ isActive }) =>
                        isActive
                          ? `${active_link} ${header_link} px-[20px] py-[5px]`
                          : `${header_link} px-[20px] py-[5px]`
                      }
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setIsMenuShown(true);
                        setPoint({ x: e.clientX, y: e.clientY });
                        setSelected({ type: "tag", name: tag.name });
                      }}
                    >
                      {tag.name}
                    </NavLink>
                  );
                })}
            </div>
          )}
        </div>
        <button
          className="duration[.2s] w-fit !rounded-[10px] bg-transparent bg-[url('@/assets/images/logout.png')] bg-[position:15px_15px] bg-no-repeat py-[8px] pr-[20px] pl-[40px] !leading-[30px] ease-in-out hover:!bg-[#e9e9e9]"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
      {isMenuShown && (
        <CustomContextMenu point={point} handleShow={openDeleteConfirmModal} />
      )}
    </>
  );
}

export default Header;
