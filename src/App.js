import Login from "./components/Login";
import Todo from "./components/Todo";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/todo" element={<Todo/>}/>
      </Routes>

    </div>
  );
}

export default App;
