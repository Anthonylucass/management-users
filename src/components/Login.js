import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";  
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");  

    try {
      
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.error("Erro ao autenticar:", error.message);
        setErrorMessage("Erro ao autenticar. Verifique suas credenciais.");
        return;
      }

      onLogin(user);
      navigate("/management");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      setErrorMessage("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome</h1>
      <div className="login-icon">A</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="login-button">
          ENTRAR
        </button>
      </form>
      <p className="signup-text">
        Não possui uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
      <p className="reset-text">
        Esqueceu a senha? <Link to="/">Resetar senha</Link>
      </p>
    </div>
  );
}

export default Login;
