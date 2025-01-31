import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserTable from "./components/UserTable";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userGroup, setUserGroup] = React.useState(""); // Admin, Superadmin, etc.

  const handleLogin = (group) => {
    setIsLoggedIn(true);
    setUserGroup(group); // Exemplo: "admin" ou "superadmin"
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserGroup("");
  };

  return (
    <Router>
      <Routes>
        {/* Se logado, vai para a tabela de usuários; senão, redireciona para login */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <UserTable onLogout={handleLogout} userGroup={userGroup} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        {/* Rota para login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Rota para cadastro */}
        <Route path="/register" element={<Register />} />
        {/* Rota para cadastro */}
        <Route path="/management" element={<UserTable />} />
      </Routes>
    </Router>
  );
}

export default App;
