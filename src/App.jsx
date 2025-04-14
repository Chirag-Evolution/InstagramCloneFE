import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'
import { BrowserRouter,Route,Routes } from "react-router";
import Navbar from './Navbar';
import SignIn from './SignIn';
import Signup from './Signup';
function App() {
 

  return (
    <>
   <Navbar></Navbar>
   
    <Routes>
    <Route path='/' element={<Signup/>}></Route>
    <Route path="/signin" element={<SignIn />} />
    <Route path='/signup' element={<Signup/>}></Route>
    </Routes>
    

    </>
  )
}

export default App
