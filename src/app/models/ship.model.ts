export interface Ship {
  _id?: string;
  name: string;
  faction: 'Rebel' | 'Imperial' | 'Scum' | 'Republic' | 'Separatist' | 'Resistance' | 'First Order';
  quantity: number;
  pilots: string[];
}
