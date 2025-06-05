import { atom, selector } from "recoil";
import { Todo } from "../types/Todo";

// 로컬 스토리지에서 데이터를 불러오는 함수
const loadTodosFromStorage = (): Todo[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem("todos");
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
    }));
  } catch (error) {
    console.error("로컬 스토리지에서 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};

// Todo 목록 atom
export const todosState = atom<Todo[]>({
  key: "todosState",
  default: loadTodosFromStorage(),
  effects: [
    ({ onSet }) => {
      onSet((newTodos) => {
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("todos", JSON.stringify(newTodos));
          } catch (error) {
            console.error(
              "로컬 스토리지에 데이터를 저장하는 중 오류 발생:",
              error
            );
          }
        }
      });
    },
  ],
});

// 검색어 atom
export const searchQueryState = atom<string>({
  key: "searchQueryState",
  default: "",
});

// 필터 atom
export const filterState = atom<"all" | "todo" | "inProgress" | "completed">({
  key: "filterState",
  default: "all",
});

// 필터링된 Todo 목록 selector
export const filteredTodosState = selector<Todo[]>({
  key: "filteredTodosState",
  get: ({ get }) => {
    const todos = get(todosState);
    const searchQuery = get(searchQueryState);
    const filter = get(filterState);

    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" || todo.status === filter;
      return matchesSearch && matchesFilter;
    });
  },
});

// 상태별 Todo 목록 selectors
export const todosByStatusState = selector<{
  todo: Todo[];
  inProgress: Todo[];
  completed: Todo[];
}>({
  key: "todosByStatusState",
  get: ({ get }) => {
    const filteredTodos = get(filteredTodosState);
    return {
      todo: filteredTodos.filter((todo) => todo.status === "todo"),
      inProgress: filteredTodos.filter((todo) => todo.status === "inProgress"),
      completed: filteredTodos.filter((todo) => todo.status === "completed"),
    };
  },
});
