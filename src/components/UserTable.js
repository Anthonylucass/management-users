import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Importando o supabaseClient
import "./UserTable.css"; // Adicione seu estilo CSS aqui

function UserTable({ onLogout, userGroup }) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Buscar usuários do Supabase
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Erro ao carregar usuários:", error);
      } else {
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  const handleResetPassword = async (id) => {
    const { error } = await supabase.auth.api.updateUser(id, {
      password: "nova_senha_aqui", // Você pode gerar uma senha aleatória ou definir uma política
    });

    if (error) {
      alert("Erro ao resetar a senha.");
    } else {
      alert("Senha resetada com sucesso!");
    }
  };

  const handleUnlockAccount = async (id) => {
    const { error } = await supabase
      .from("users")
      .update({ status: "Ativo" })
      .eq("id", id);

    if (error) {
      alert("Erro ao desbloquear a conta.");
    } else {
      alert("Usuário desbloqueado!");
    }
  };

  const handleLockAccount = async (id) => {
    const { error } = await supabase
      .from("users")
      .update({ status: "Bloqueado" })
      .eq("id", id);

    if (error) {
      alert("Erro ao bloquear a conta.");
    } else {
      alert("Usuário bloqueado!");
    }
  };

  const handleDeleteUser = async (id, group) => {
    if (group === "admin" && userGroup !== "superadmin") {
      alert("Você não tem permissão para deletar administradores.");
      return;
    }

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Erro ao deletar o usuário.");
    } else {
      alert("Usuário deletado com sucesso!");
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.login.includes(filter) ||
      user.name.includes(filter) ||
      user.email.includes(filter)
    );
  });

  return (
    <div className="user-table-container">
      <h1>Gerenciamento de Usuários</h1>
      <p>Bem-vindo, grupo: {userGroup}</p>
      <button onClick={onLogout}>Sair</button>

      <input
        type="text"
        placeholder="Filtrar por login, nome ou email"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Idade da Senha</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.login}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.passwordAge} dias</td>
              <td>{user.group}</td>
              <td>
                <button onClick={() => handleResetPassword(user.id)}>
                  Resetar Senha
                </button>
                <button onClick={() => handleUnlockAccount(user.id)}>
                  Desbloquear
                </button>
                <button onClick={() => handleLockAccount(user.id)}>
                  Bloquear
                </button>
                {userGroup === "superadmin" && (
                  <button onClick={() => handleDeleteUser(user.id, user.group)}>
                    Deletar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
