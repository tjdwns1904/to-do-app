import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Today from './pages/Today/index'
import Upcoming from './pages/Upcoming/index'
import Signup from './pages/SignUp/index'
import Login from './pages/Login/index'
import { useEffect, useState } from 'react'
import Inbox from './pages/Inbox/index';
import axios from 'axios';
import LoadingPage from './pages/LoadingPage'
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetUser } from './hooks/useGetUser'
import { useSessionStorage } from '@uidotdev/usehooks'
import { INITIAL_USER_VALUE } from './utils/storage_const'

const queryClient = new QueryClient();
const InnerApp = () => {
  axios.defaults.withCredentials = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [_, setUser] = useSessionStorage("user", INITIAL_USER_VALUE);
  const { data: user, isLoading } = useGetUser({
    queryKey: ["user"],
  });
  const getProjects = () => {
    axios.get(`http://localhost:3000/projects/${user.id}`)
      .then(res => setProjects(res.data));
  }
  const getTags = () => {
    axios.get(`http://localhost:3000/tags/${user.id}`)
      .then(res => setTags(res.data));
  }
  useEffect(() => {
    if (user) {
      setUser(user.user[0]);
    }
  }, [user]);
  if (!isLoading) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            {<Route path='/' element={user?.isLoggedIn ? <Inbox user={user.user[0]} getProjects={getProjects} getTags={getTags} /> : <Home />} />}
            {!user?.isLoggedIn && <Route path='/login' element={<Login />} />}
            {!user?.isLoggedIn && <Route path='/signup' element={<Signup />} />}
            {user?.isLoggedIn && <Route path='/today' element={<Today user={user.user[0]} getProjects={getProjects} getTags={getTags} />} />}
            {user?.isLoggedIn && <Route path='/upcoming' element={<Upcoming user={user.user[0]} getProjects={getProjects} getTags={getTags} />} />}
            {/* {isLoggedIn && <Route path='/filter/:type/:name' element={<FilteredTask user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} />} />} */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  } else {
    return (
      <LoadingPage />
    )
  }
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  )
}

export default App
