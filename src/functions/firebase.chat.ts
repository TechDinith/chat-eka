import { doc, getDoc } from "firebase/firestore";
import { User } from "../interfaces/user.interface";
import { firestore } from "../firebase.config";

export const updateLoggedInUser = async (
  loggedInUser: User,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  if (loggedInUser && loggedInUser.docId) {
    const userDocRef = doc(firestore, "activeUsers", loggedInUser.docId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      setLoggedInUser({
        ...loggedInUser,
        ...userData,
      });
    }
  }
};
