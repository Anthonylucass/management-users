import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient'; 
import "./Register.css";

function Register() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setError("");

    try {

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      let idadeSenha = null; 
      let statusConta = 'Ativa';
      let login = new Date().toISOString(); 
      let grupoAcesso = null; 
      
      let idadeSenhaToInsert = idadeSenha === null || idadeSenha === undefined ? 1 : idadeSenha;
      
      let grupoAcessoToInsert = grupoAcesso === null || grupoAcesso === undefined ? 'Comum' : grupoAcesso;

      const { error: dbError } = await supabase
        .from("users")
        .insert([{
          nome,
          sobrenome,
          email,
          idadeSenha: idadeSenhaToInsert,
          statusConta,
          login,
          grupoAcesso: grupoAcessoToInsert,
          password
        }]);

      if (dbError) {
        setError(dbError.message);
      } else {
        console.log("Usuário cadastrado:", { nome, sobrenome, email });
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setError("Ocorreu um erro ao cadastrar o usuário.");
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmação da senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="register-button">
          CADASTRAR
        </button>
      </form>
      <p className="login-text">
        Já possui uma conta? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
