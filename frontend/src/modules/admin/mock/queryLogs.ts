export type QueryLogRow = {
  id: string;
  question: string;
  model: string;
  status: "OK" | "Error" | "Flagged";
  at: string;
};

export const MOCK_QUERY_LOGS: QueryLogRow[] = [
  {
    id: "1",
    question: "What is notice period for termination?",
    model: "Groq",
    status: "OK",
    at: "2026-03-21 10:02",
  },
  {
    id: "2",
    question: "Draft a binding Supreme Court opinion",
    model: "Groq",
    status: "Flagged",
    at: "2026-03-21 10:18",
  },
  {
    id: "3",
    question: "Summarize uploaded NDA",
    model: "Gemini",
    status: "Error",
    at: "2026-03-21 10:22",
  },
];
