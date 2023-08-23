export interface User {
  username: string;
  docId: string;
  age: string;
  gender: string;
  hasNewMessage?: boolean; // Change the type to string array
}

export interface ChatRoomProps {
  activeUsers: User[];
  user: User;
  onLogout: () => void;
  setActiveUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface Message {
  message: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
