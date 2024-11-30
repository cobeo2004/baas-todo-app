import { Todo } from "./types";

export const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Write and submit the project proposal for the new client",
    dueDate: "2024-01-15",
    completed: false,
  },
  {
    id: "2",
    title: "Review Code Changes",
    description: "Review pull requests and merge approved changes",
    dueDate: "2024-01-10",
    completed: true,
  },
  {
    id: "3",
    title: "Team Meeting",
    description: "Weekly team sync to discuss project progress",
    dueDate: "2024-01-08",
    completed: false,
  },
];
