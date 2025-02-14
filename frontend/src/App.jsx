import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home_without_signin} from "./pages/Home_without_signin"
import {Signin} from "./pages/Signin"
import {CHome} from "./pages/Client/CHome"
import {CList} from "./pages/Client/CList"
import {CNotification} from "./pages/Client/CNotification"
import {CSignup} from "./pages/Client/CSignup"
import {WHome} from "./pages/Worker/WHome"
import { Signup } from './pages/signup'
import {WList} from "./pages/Worker/WList"
import {WNotification} from "./pages/Worker/WNotification"
// import {WProfile} from "./pages/Worker/WProfile"
import {WSignup} from "./pages/Worker/WSignup"
import { WFeedback } from './pages/Worker/WFeedback'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home_without_signin/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/client' element={<CHome/>}></Route>
            <Route path='/client/list' element={<CList/>}></Route>
            <Route path='/client/notification' element={<CNotification/>}></Route>
            <Route path='/client/signup' element={<CSignup/>}></Route>
            <Route path='/worker' element={<WHome/>}></Route>
            <Route path='/worker/signup' element={<WSignup/>}></Route>
            <Route path='/worker/notification' element={<WNotification/>}></Route>
            <Route path='/worker/list' element={<WList/>}></Route>
            <Route path='/worker/feedback' element={<WFeedback/>}></Route>
            {/* <Route path='/worker/profile' element={<WProfile/>}></Route> */}
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
