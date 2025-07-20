export interface ChatMessage {
  id: number;
  sender: number;
  timestamp: string;  // or use `Date` and convert when loading
  message: string;
}