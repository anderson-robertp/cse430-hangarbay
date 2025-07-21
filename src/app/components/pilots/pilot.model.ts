export interface Pilot {
  _id?: string; // MongoDB ObjectId as string
  name: string;
  id: number;
  unique: boolean;
  ship: string;
  skill: number;
  points: number;
  slots: string[];
  text: string;
  image: string;
  faction: string;
  xws: string;
}
