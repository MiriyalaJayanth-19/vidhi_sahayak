export type Lawyer = {
  id: string;
  name: string;
  practices: string[]; // e.g., ["Civil", "Criminal"]
  experienceYears: number;
  location: string;
  fee: number; // per session in INR
};

export const LAWYERS: Lawyer[] = [
  {
    id: "l1",
    name: "Adv. Aditi Rao",
    practices: ["Civil", "Property", "Contracts"],
    experienceYears: 7,
    location: "Hyderabad",
    fee: 1500,
  },
  {
    id: "l2",
    name: "Adv. Karthik Menon",
    practices: ["Criminal", "Cyber"],
    experienceYears: 5,
    location: "Bengaluru",
    fee: 2000,
  },
  {
    id: "l3",
    name: "Adv. Nisha Sharma",
    practices: ["IPR", "Design Patents", "Trademarks"],
    experienceYears: 9,
    location: "Mumbai",
    fee: 2500,
  },
  {
    id: "l4",
    name: "Adv. Rohan Gupta",
    practices: ["Family", "Rental", "Civil"],
    experienceYears: 6,
    location: "Delhi",
    fee: 1200,
  },
  {
    id: "l5",
    name: "Adv. Priya Desai",
    practices: ["Corporate", "MOU", "Agreements"],
    experienceYears: 8,
    location: "Pune",
    fee: 1800,
  },
];
