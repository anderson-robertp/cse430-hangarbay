export interface Ship {
  id: number;
  name: string;
  faction: string[]; // e.g., ["Rebel Alliance"]
  attack: number;
  agility: number;
  hull: number;
  shields: number;
  actions: string[]; // e.g., ["Focus", "Target Lock"]
  maneuvers: number[][]; // 2D array representing maneuver difficulty
  size: 'small' | 'medium' | 'large' | string;
  xws: string; // standardized XWS code like "xwing"
  firing_arcs: string[]; // e.g., ["Front"]
  dial: string[]; // e.g., ["1BG", "2TW", ...]
}
