import { useSetRecoilState } from "recoil";
import { useCallback } from "react";
import { todosState, searchQueryState, filterState } from "../store/todoAtoms";
import { Todo } from "../types/Todo";

export const useTodoActions = () => {
  const setTodos = useSetRecoilState(todosState);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const setFilter = useSetRecoilState(filterState);

  const addTodo = useCallback((todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  }, [setTodos]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, [setTodos]);

  const moveTodo = useCallback((todoId: string, newStatus: Todo["status"]) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, status: newStatus, updatedAt: new Date() }
          : todo
      )
    );
  }, [setTodos]);

  const reorderTodos = useCallback(
    (
      sourceIndex: number,
      destinationIndex: number,
      status: Todo["status"]
    ) => {
      setTodos((prev) => {
        const statusTodos = prev.filter((todo) => todo.status === status);

        const [movedTodo] = statusTodos.splice(sourceIndex, 1);
        statusTodos.splice(destinationIndex, 0, movedTodo);

        const todoItems = prev.filter((todo) => todo.status === "todo");
        const inProgressItems = prev.filter(
          (todo) => todo.status === "inProgress"
        );
        const completedItems = prev.filter((todo) => todo.status === "completed");

        if (status === "todo") {
          return [...statusTodos, ...inProgressItems, ...completedItems];
        } else if (status === "inProgress") {
          return [...todoItems, ...statusTodos, ...completedItems];
        } else {
          return [...todoItems, ...inProgressItems, ...statusTodos];
        }
      });
    },
    [setTodos]
  );

  const clearAllTodos = useCallback(() => {
    setTodos([]);
  }, [setTodos]);

  const importTodos = useCallback((newTodos: Todo[]) => {
    setTodos((prev) => [...prev, ...newTodos]);
  }, [setTodos]);

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  const updateFilter = useCallback(
    (filter: "all" | "todo" | "inProgress" | "completed") => {
      setFilter(filter);
    },
    [setFilter]
  );

  return {
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
    reorderTodos,
    clearAllTodos,
    importTodos,
    updateSearchQuery,
    updateFilter,
  };
};
