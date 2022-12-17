import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Footer } from './components/Footer';
import { AllBlogs } from './components/AllBlogs';
import { MyBlogs } from './components/MyBlogs';
import { createContext, useEffect, useState } from 'react';
import { CMP404 } from './components/404';
import { AddBlog } from './components/AddBlog';
import { EditBlog } from './components/EditBlog';

const UserLoginContext = createContext();

function App() {
  const [isLoggedIn, setLogIn] = useState();

  useEffect(() => {
    if(document.cookie.includes('jwtoken')){
      setLogIn(true);
    }else{
      setLogIn(false);
    }
  }, [])
  

  // Once user is logged in update state
  const setUserLogIn = () => {
    setLogIn(isLoggedIn ? false : true);
  }

  if(isLoggedIn){
    return (
      // Basic Web Page Layout goes here ..
      <>
        <UserLoginContext.Provider value={{ isLoggedIn, setUserLogIn }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<AllBlogs />}/>
            <Route path='/myBlogs' element={<MyBlogs />} />
            <Route path='/addBlog' element={<AddBlog />} />
            <Route path='/editBlog' element={<EditBlog />} />
            <Route path='*' element={<CMP404 />} />  {/* 404 error page */}
          </Routes>
        </UserLoginContext.Provider>
        <Footer />
      </>
    );
  }else{
    return (
      // Basic Web Page Layout goes here ..
      <>
        <UserLoginContext.Provider value={{ isLoggedIn, setUserLogIn }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signUp' element={<SignUp />}/>
            <Route path='*' element={<CMP404 />} />  {/* 404 error page */}
          </Routes>
        </UserLoginContext.Provider>
        <Footer />
      </>
    );
  }
}

export default App;
export { UserLoginContext };
