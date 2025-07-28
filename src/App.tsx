import  Navbar from './components/Nav/Navbar';
import './App.css'
import {  Routes, Route } from "react-router-dom";
import Signup from './components/SignUp/SignUp';
import Login from './components/Login/Login'
function App() {

  return (
    <>
    <Routes>
      <Route path="/"  element={<Navbar />} />
            <Route path="/signUp"  element={<Signup />} />
            <Route path="/login"  element={<Login />} />

    </Routes>
   
    
    </>
  )
}

export default App
