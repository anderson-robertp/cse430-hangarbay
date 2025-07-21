export interface Upgrade {
  _id?: string; // MongoDB ObjectId as string
  id: number;
  name: string;
  slot: string;
  points: number;
  attack?: number;
  range?: string;
  text: string;
  image: string;
  xws: string;
}
