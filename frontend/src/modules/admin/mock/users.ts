export type UserRow = {
  id: string;
  email: string;
  role: string;
  queries: number;
  status: "Active" | "Suspended";
};

export const MOCK_USERS: UserRow[] = [
  { id: "u1", email: "demo@tebeka.test", role: "user", queries: 42, status: "Active" },
  { id: "u2", email: "firm@example.com", role: "pro", queries: 310, status: "Active" },
  { id: "u3", email: "abuse@spam.test", role: "user", queries: 2, status: "Suspended" },
];
