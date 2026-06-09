export interface Message {
  message: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
