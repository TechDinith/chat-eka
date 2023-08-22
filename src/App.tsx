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
import { firestore } from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  const handleLogin = async (username: string, nic: string) => {
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

    try {
      // Store the user information in Firestore
      await addDoc(collection(firestore, "activeUsers"), newUser);
      setLoggedInUser(newUser);
    } catch (error) {
      console.error("Error adding document:", error);
    }

    setLoggedInUser(newUser);
  };
  const handleLogout = async () => {
    const nic = loggedInUser?.nic || "";

    try {
      // Delete the user's document from the activeUsers collection
      await deleteDoc(doc(firestore, "activeUsers", nic));
    } catch (error) {
      console.error("Error deleting document:", error);
    }

    // Remove user from activeUsers state
    setActiveUsers((prevActiveUsers) =>
      prevActiveUsers.filter((user) => user.nic !== nic)
    );

    // Clear user data from local storage
    localStorage.removeItem("username");
    localStorage.removeItem("nic");
    localStorage.removeItem("age");
    localStorage.removeItem("gender");

    setLoggedInUser(null);
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

    const fetchActiveUsers = async () => {
      const activeUsersRef = collection(firestore, "activeUsers");
      const querySnapshot = await getDocs(activeUsersRef);
      const usersArray = querySnapshot.docs.map((doc) => doc.data() as User);
      setActiveUsers(usersArray);
    };

    fetchActiveUsers();
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
