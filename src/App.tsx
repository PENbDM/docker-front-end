
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from './pages/Home'
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn'
import './App.css'
import Datasource from "./pages/Datasource.tsx";

function App() {

  return (
      <>
      <BrowserRouter>
          <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login/sign-up" element={<SignUp/>} />
            <Route path="/login/sign-in" element={<SignIn/>} />
            <Route path='/datasource' element={<Datasource/>}/>
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
