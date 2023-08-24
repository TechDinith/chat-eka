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
  onSnapshot,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  // Function to fetch active users from Firestore
  const fetchActiveUsers = () => {
    const activeUsersRef = collection(firestore, "activeUsers");
    const unsubscribe = onSnapshot(activeUsersRef, (querySnapshot) => {
      const usersArray: User[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data() as User;
        const userWithDocId = {
          ...userData,
          docId: doc.id, // Add the document ID to the user data
        };
        usersArray.push(userWithDocId);
      });

      setActiveUsers(usersArray);
    });

    return () => {
      // Unsubscribe when component unmounts or fetchActiveUsers is called again
      unsubscribe();
    };
  };

  const handleLogin = async (username: string, nic: string) => {
    const birthYear = extractBirthYear(nic);
    const gender = extractGender(nic);
    const age = calculateAge(parseInt(birthYear));

    const newUserWithoutNic = {
      username,
      age: age.toString(),
      gender,
    };

    try {
      // Store the user information in Firestore without nic
      const docRef = await addDoc(
        collection(firestore, "activeUsers"),
        newUserWithoutNic
      );

      // Store the complete user information in local storage along with docId
      const completeUser = {
        ...newUserWithoutNic,
        nic,
        docId: docRef.id,
      };
      localStorage.setItem("username", completeUser.username);
      localStorage.setItem("nic", completeUser.nic);
      localStorage.setItem("age", completeUser.age);
      localStorage.setItem("gender", completeUser.gender);
      localStorage.setItem("docId", completeUser.docId);

      setLoggedInUser({
        username: completeUser.username,
        age: completeUser.age,
        gender: completeUser.gender,
        docId: completeUser.docId,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleLogout = async () => {
    const docId = loggedInUser?.docId || "";

    try {
      // Delete the user's document from the activeUsers collection
      await deleteDoc(doc(firestore, "activeUsers", docId));

      // Delete all private messages associated with the user
      const privateMessagesRef = collection(firestore, "privateMessages");
      const querySnapshot = await getDocs(
        query(
          privateMessagesRef,
          where("participants", "array-contains", docId)
        )
      );

      const batch = writeBatch(firestore);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
    // Retrieve the activeUsers data from Firestore and update activeUsers state
    const activeUsersRef = collection(firestore, "activeUsers");
    const querySnapshot = await getDocs(activeUsersRef);
    const usersArray = querySnapshot.docs.map((doc) => doc.data() as User);
    setActiveUsers(usersArray);

    // Clear user data from local storage
    localStorage.removeItem("username");
    localStorage.removeItem("nic");
    localStorage.removeItem("age");
    localStorage.removeItem("gender");
    localStorage.removeItem("docId"); // Clear the stored docId

    setLoggedInUser(null);
  };

  useEffect(() => {
    fetchActiveUsers();

    const storedUsername = localStorage.getItem("username");
    const storedAge = localStorage.getItem("age");
    const storedGender = localStorage.getItem("gender");
    const storedDocId = localStorage.getItem("docId"); // Retrieve stored docId

    if (storedUsername && storedAge && storedGender && storedDocId) {
      const storedUser: User = {
        username: storedUsername,
        age: storedAge,
        gender: storedGender,
        docId: storedDocId,
      };

      setLoggedInUser(storedUser);
    }
  }, []);

  // Listen for changes to the loggedInUser and update it with data from Firestore
  useEffect(() => {
    if (loggedInUser) {
      const userDocRef = doc(firestore, "activeUsers", loggedInUser.docId);
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const updatedUserData = docSnapshot.data() as User;

          setLoggedInUser({
            ...loggedInUser,
            ...updatedUserData,
          });
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <div id="App">
      {loggedInUser ? (
        <ChatRoom
          setLoggedInUser={setLoggedInUser}
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
