export interface User {
  _id?: string;             // Optional, assigned by MongoDB
  id: number;
  username: string;
  email: string;
  inventory: number[];      // IDs of pilot/upgrades/etc
  fleets: string[];         // ObjectId strings referencing Fleet documents
}
