import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Unregistered/Home'
import Today from './Registered/Today'
import Upcoming from './Registered/Upcoming'
import Signup from './Signup'
import Login from './Login'
import { useEffect, useState } from 'react'
import Inbox from './Registered/Inbox';
import axios from 'axios';
import FilteredTask from './Registered/FilteredTask';
import LoadingPage from './LoadingPage'
import NotFound from './NotFound';

function App() {
  axios.defaults.withCredentials = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  
  const checkAuth = () => {
    axios.get("http://localhost:3000/auth", { withCredentials: true })
      .then(res => {
        if (res.data.isLoggedIn) {
          setUser(res.data.user[0]);
        }
        setIsLoggedIn(res.data.isLoggedIn);
      }
      )
      .finally(() => setIsLoading(false));
  }
  const getProjects = () => {
    axios.post("http://localhost:3000/projects", {
      id: user.id
    })
      .then(res => setProjects(res.data));
  }
  const getTags = () => {
    axios.post("http://localhost:3000/tags", {
      id: user.id
    })
      .then(res => setTags(res.data));
  }
  useEffect(() => {
    checkAuth();
  }, []);
  if (!isLoading) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            {<Route path='/' element={isLoggedIn ? <Inbox user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} /> : <Home />} />}
            {!isLoggedIn && <Route path='/login' element={<Login />} />}
            {!isLoggedIn && <Route path='/signup' element={<Signup />} />}
            {isLoggedIn && <Route path='/today' element={<Today user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} />} />}
            {isLoggedIn && <Route path='/upcoming' element={<Upcoming user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} />} />}
            {isLoggedIn && <Route path='/filter/:type/:name' element={<FilteredTask user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} />} />}
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

export default App
