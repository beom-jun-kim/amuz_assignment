"use client";

import { useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import { todosByStatusState } from "../store/todoAtoms";
import { useTodoActions } from "../hooks/useTodoActions";
import SearchBar from "./SearchBar";
import TodoForm from "./TodoForm";
import TodoColumn from "./TodoColumn";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

// 메인 TODO 애플리케이션 컴포넌트
export default function TodoApp() {
  const todosByStatus = useRecoilValue(todosByStatusState);
  const { moveTodo, reorderTodos, clearAllTodos } = useTodoActions();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 드래그 앤 드롭 완료 시 호출되는 함수
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    // 드롭 위치가 없으면 아무것도 하지 않음
    if (!destination) return;

    // 같은 위치에 드롭하면 아무것도 하지 않음
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 다른 컬럼으로 이동하는 경우
    if (destination.droppableId !== source.droppableId) {
      moveTodo(
        draggableId,
        destination.droppableId as "todo" | "inProgress" | "completed"
      );
    } else {
      // 같은 컬럼 내에서 순서 변경
      reorderTodos(
        source.index,
        destination.index,
        source.droppableId as "todo" | "inProgress" | "completed"
      );
    }
  }, [moveTodo, reorderTodos]);

  // 전체 데이터 삭제 함수
  const handleClearAllData = useCallback(() => {
    if (
      confirm(
        "정말로 모든 할일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      if (confirm("마지막 확인: 모든 데이터가 영구적으로 삭제됩니다.")) {
        clearAllTodos();
        alert("모든 데이터가 삭제되었습니다.");
      }
    }
  }, [clearAllTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">할일 관리</h1>
          <p className="text-gray-600">
            효율적으로 작업을 관리하고 진행 상황을 추적하세요
          </p>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar />
          <div className="flex gap-2">
            <Button
              onClick={() => setIsFormOpen(true)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4" />새 할일 추가
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAllData}
              className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" />
              전체 삭제
            </Button>
          </div>
        </div>

        {/* TODO 컬럼들 */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TodoColumn
              title="해야 할 일"
              status="todo"
              todos={todosByStatus.todo}
              color="bg-red-50 border-red-200"
              headerColor="bg-red-100 text-red-800"
            />
            <TodoColumn
              title="진행 중"
              status="inProgress"
              todos={todosByStatus.inProgress}
              color="bg-yellow-50 border-yellow-200"
              headerColor="bg-yellow-100 text-yellow-800"
            />
            <TodoColumn
              title="완료됨"
              status="completed"
              todos={todosByStatus.completed}
              color="bg-green-50 border-green-200"
              headerColor="bg-green-100 text-green-800"
            />
          </div>
        </DragDropContext>

        {/* TODO 추가/수정 폼 모달 */}
        {isFormOpen && (
          <TodoForm
            onClose={() => setIsFormOpen(false)}
            onSubmit={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
