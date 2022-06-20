import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { createContext, useState } from "react";
export const AuthContext = createContext({ user: null });
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log({ user });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <header>
          <Nav />
        </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
