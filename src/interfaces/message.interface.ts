export interface Message {
  id: string;
  message: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
