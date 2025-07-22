import { FleetShip } from "../fleets/fleet.model";

export interface User {
  _id?: string;             // Optional, assigned by MongoDB
  id: number;
  username: string;
  email: string;
  inventory: FleetShip[];      // IDs of pilot/upgrades/etc
  fleets: number[];         // ObjectId strings referencing Fleet documents
}
