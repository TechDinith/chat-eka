import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth, useActiveUsers } from "./hooks";
import LoginForm from "./components/LoginForm";
import ChatRoom from "./components/ChatRoom";
import ContentPage from "./components/ContentPage";
import { PAGE_ORDER } from "./content/pages";

function Chat() {
  const { user, login, logout } = useAuth();
  const activeUsers = useActiveUsers();

  if (!user) return <LoginForm onLogin={login} />;

  return <ChatRoom user={user} activeUsers={activeUsers} onLogout={logout} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        {PAGE_ORDER.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<ContentPage slug={p.slug} />} />
        ))}
        <Route path="*" element={<ContentPage slug="about" />} />
      </Routes>
    </BrowserRouter>
  );
}
