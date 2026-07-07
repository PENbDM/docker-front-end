
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from './pages/Home'
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn'
import './App.css'
import Datasource from "./pages/Datasource.tsx";
import ProtectedRoutes from "./components/utils/ProtectedRoutes.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {

  return (
      <>
      <BrowserRouter>
          <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route element={<ProtectedRoutes/>}>
                <Route path='/datasource' element={<Datasource/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='dashboard/:id' element={<Dashboard/>}/>
            </Route>
            <Route path="/login/sign-up" element={<SignUp/>} />
            <Route path="/login/sign-in" element={<SignIn/>} />
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
