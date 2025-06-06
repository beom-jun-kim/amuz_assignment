"use client";

import { useState, useCallback, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../types/Todo";
import { useTodoActions } from "../hooks/useTodoActions";
import TodoForm from "./TodoForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, AlertCircle, Circle, CheckCircle } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  index: number;
}

// 개별 TODO 아이템 컴포넌트
export default function TodoItem({ todo, index }: TodoItemProps) {
  const { deleteTodo } = useTodoActions();
  const [isEditing, setIsEditing] = useState(false);

  // TODO 삭제 핸들러
  const handleDelete = useCallback(() => {
    if (window.confirm("정말로 이 할일을 삭제하시겠습니까?")) {
      deleteTodo(todo.id);
    }
  }, [deleteTodo, todo.id]);

  // 우선순위에 따른 색상 및 아이콘 설정
  const getPriorityConfig = (priority: Todo["priority"]) => {
    switch (priority) {
      case "high":
        return {
          color: "text-red-600 bg-red-100",
          icon: AlertCircle,
          text: "높음",
        };
      case "medium":
        return {
          color: "text-yellow-600 bg-yellow-100",
          icon: Circle,
          text: "보통",
        };
      case "low":
        return {
          color: "text-green-600 bg-green-100",
          icon: CheckCircle,
          text: "낮음",
        };
    }
  };

  const priorityConfig = useMemo(() => getPriorityConfig(todo.priority), [todo.priority]);
  const PriorityIcon = priorityConfig.icon;

  return (
    <>
      <Draggable draggableId={todo.id} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`mb-3 transition-all duration-200 hover:shadow-md ${
              snapshot.isDragging ? "shadow-lg rotate-2 scale-105" : ""
            } ${todo.status === "completed" ? "opacity-75" : ""}`}
          >
            <CardContent className="p-4">
              {/* TODO 제목 */}
              <h3
                className={`font-semibold text-lg mb-2 ${
                  todo.status === "completed"
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </h3>

              {/* TODO 설명 */}
              <p
                className={`text-sm mb-3 ${
                  todo.status === "completed"
                    ? "line-through text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {todo.description}
              </p>

              {/* 우선순위 표시 */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.color}`}
                >
                  <PriorityIcon className="w-3 h-3" />
                  {priorityConfig.text}
                </div>

                {/* 생성일 표시 */}
                <span className="text-xs text-gray-400">
                  {todo.createdAt.toLocaleDateString("ko-KR")}
                </span>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Edit className="w-3 h-3" />
                  수정
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                  삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </Draggable>

      {/* 수정 폼 모달 */}
      {isEditing && (
        <TodoForm
          todo={todo}
          onClose={() => setIsEditing(false)}
          onSubmit={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
