import Body from "./Body"
import NavBar from "./NavBar"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Login from "./Login"
import Profile from "./Profile"

export default function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}