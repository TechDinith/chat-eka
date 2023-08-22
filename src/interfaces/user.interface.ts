export interface User {
  username: string;
  nic: string;
  age: string;
  gender: string;
  hasNewMessage?: boolean;
  lastActive?: Date;
}
