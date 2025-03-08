import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/index";
import Signup from "./pages/SignUp/index";
import Login from "./pages/Login/index";
import Inbox from "./pages/Inbox/index";
import NotFound from "./pages/NotFound";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "./utils/storage_const";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import FilteredTask from "./pages/FilteredTask";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
const InnerApp = () => {
  const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {<Route path="/" element={user?.isLoggedIn ? <Inbox /> : <Home />} />}
          {!user?.isLoggedIn && <Route path="/login" element={<Login />} />}
          {!user?.isLoggedIn && <Route path="/signup" element={<Signup />} />}
          {user?.isLoggedIn && <Route path="/today" element={<Today />} />}
          {user?.isLoggedIn && (
            <Route path="/upcoming" element={<Upcoming />} />
          )}
          {user?.isLoggedIn && (
            <Route path="/:type/:name" element={<FilteredTask />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <InnerApp />
    </QueryClientProvider>
  );
}

export default App;
