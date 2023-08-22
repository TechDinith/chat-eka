import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import "./app.scss";
import {
  calculateAge,
  extractBirthYear,
  extractGender,
} from "./functions/functions.chat";
import ChatRoom from "./components/ChatRoom";
import { User } from "./interfaces/user.interface";
import { seoText } from "./constants.chat";

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  const handleLogin = (username: string, nic: string) => {
    const birthYear = extractBirthYear(nic);
    const gender = extractGender(nic);
    const age = calculateAge(parseInt(birthYear));

    const newUser: User = {
      username,
      nic,
      age: age.toString(),
      gender,
    };

    // Store the user information in local storage
    localStorage.setItem("username", newUser.username);
    localStorage.setItem("nic", newUser.nic);
    localStorage.setItem("age", newUser.age);
    localStorage.setItem("gender", newUser.gender);

    setLoggedInUser(newUser);
    setActiveUsers((prevActiveUsers) => [...prevActiveUsers, newUser]);
  };

  const handleLogout = () => {
    const nic = loggedInUser?.nic || "";
    localStorage.removeItem("username");
    localStorage.removeItem("nic");
    localStorage.removeItem("age");
    localStorage.removeItem("gender");
    setLoggedInUser(null);

    setActiveUsers((prevActiveUsers) =>
      prevActiveUsers.filter((user) => user.nic !== nic)
    );
  };

  useEffect(() => {
    // Check if user information is stored in local storage
    const storedUsername = localStorage.getItem("username");
    const storedNIC = localStorage.getItem("nic");
    const storedAge = localStorage.getItem("age");
    const storedGender = localStorage.getItem("gender");

    if (storedUsername && storedNIC && storedAge && storedGender) {
      const storedUser: User = {
        username: storedUsername,
        nic: storedNIC,
        age: storedAge,
        gender: storedGender,
      };

      setLoggedInUser(storedUser);
    }
  }, []);

  if (loggedInUser) {
    const existingUser = activeUsers.find(
      (user) => String(user.nic) === String(loggedInUser?.nic)
    );

    if (!existingUser) {
      setActiveUsers((prevActiveUsers) => [
        ...prevActiveUsers,
        loggedInUser as User,
      ]);
    }
  }

  return (
    <div id="App">
      {loggedInUser ? (
        <ChatRoom
          setActiveUsers={setActiveUsers}
          user={loggedInUser}
          activeUsers={activeUsers}
          onLogout={handleLogout}
        />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}

      <div className="seo-text" dangerouslySetInnerHTML={{ __html: seoText }} />
    </div>
  );
};

export default App;
