export interface Todo {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "todo" | "inProgress" | "completed"
  createdAt: Date
  updatedAt: Date
}
