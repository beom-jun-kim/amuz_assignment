"use client";

import type React from "react";
import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  todosState,
  searchQueryState,
  filterState,
} from "../store/todoAtoms";
import { useTodoActions } from "../hooks/useTodoActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// 검색 및 필터링 컴포넌트
export default function SearchBar() {
  const todos = useRecoilValue(todosState);
  const searchQuery = useRecoilValue(searchQueryState);
  const filter = useRecoilValue(filterState);
  const { updateSearchQuery, updateFilter } = useTodoActions();

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e.target.value);
  }, [updateSearchQuery]);

  // 필터 변경 핸들러
  const handleFilterChange = useCallback((
    newFilter: "all" | "todo" | "inProgress" | "completed"
  ) => {
    updateFilter(newFilter);
  }, [updateFilter]);

  // 상태별 할일 개수 계산 - 메모이제이션
  const todoStats = useMemo(() => {
    const completedTodos = todos.filter(
      (todo) => todo.status === "completed"
    ).length;
    const inProgressTodos = todos.filter(
      (todo) => todo.status === "inProgress"
    ).length;
    const todoTodos = todos.filter((todo) => todo.status === "todo").length;

    return {
      completedTodos,
      inProgressTodos,
      todoTodos
    };
  }, [todos]);

  return (
    <div className="space-y-4">
      {/* 기존 검색 및 필터 */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {/* 검색 입력 필드 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="할일 검색..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 필터 버튼들 */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("all")}
            className="flex items-center gap-1"
          >
            <Filter className="w-3 h-3" />
            전체
          </Button>
          <Button
            variant={filter === "todo" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("todo")}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            해야 할 일 ({todoStats.todoTodos})
          </Button>
          <Button
            variant={filter === "inProgress" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("inProgress")}
            className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
          >
            진행 중 ({todoStats.inProgressTodos})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("completed")}
            className="text-green-600 border-green-200 hover:bg-green-50"
          >
            완료됨 ({todoStats.completedTodos})
          </Button>
        </div>
      </div>
    </div>
  );
}
