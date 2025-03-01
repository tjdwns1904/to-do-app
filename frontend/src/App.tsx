import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Signup from './pages/SignUp/index'
import Login from './pages/Login/index'
import Inbox from './pages/Inbox/index';
import NotFound from './pages/NotFound';
import { useSessionStorage } from '@uidotdev/usehooks'
import { INITIAL_USER_VALUE } from './utils/storage_const'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const InnerApp = () => {
  const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {<Route path='/' element={user?.isLoggedIn ? <Inbox /> : <Home />} />}
          {!user?.isLoggedIn && <Route path='/login' element={<Login />} />}
          {!user?.isLoggedIn && <Route path='/signup' element={<Signup />} />}
          {/* {user?.isLoggedIn && <Route path='/today' element={<Today/>} />}
            {user?.isLoggedIn && <Route path='/upcoming' element={<Upcoming/>} />} */}
          {/* {isLoggedIn && <Route path='/filter/:type/:name' element={<FilteredTask user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} />} />} */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  )
}

export default App
