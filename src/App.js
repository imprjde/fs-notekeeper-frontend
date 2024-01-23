import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createNote" element={<CreateNote />} />
          <Route path="/editNote/:id" element={<EditNote />} />
          <Route path="/:id/reset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
