export interface ChatMessage {
  id: number;
  sender: string;
  timestamp: string;  // or use `Date` and convert when loading
  message: string;
}