import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { createContext, useState } from "react";
import Unauthorized from "./components/Unauthorized";
import FilterProvider from "./components/Store/FilterProvider";
export const AuthContext = createContext({ user: null });
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FilterProvider>
        <div className="App">
          <header>
            <Nav />
          </header>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/401" element={<Unauthorized />} />
          </Routes>
        </div>
      </FilterProvider>
    </AuthContext.Provider>
  );
}

export default App;
