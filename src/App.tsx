import { useAuth, useActiveUsers } from "./hooks";
import LoginForm from "./components/LoginForm";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const { user, setUser, login, logout } = useAuth();
  const activeUsers = useActiveUsers();

  if (!user) return <LoginForm onLogin={login} />;

  return (
      <ChatRoom
        user={user}
        activeUsers={activeUsers}
        onLogout={logout}
      />
  );
}
