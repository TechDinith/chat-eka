import { useState, useEffect } from "react";
import type { User } from "../interfaces/user.interface";
import * as activeUsersService from "../services/activeUsers";

export function useActiveUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    return activeUsersService.subscribeUsers(setUsers);
  }, []);

  return users;
}
