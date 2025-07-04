"use client";
import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import type { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface TodoColumnProps {
  title: string;
  status: Todo["status"];
  todos: Todo[];
  color: string;
  headerColor: string;
}

// TODO 컬럼 컴포넌트 - 각 상태별 TODO들을 표시
function TodoColumn({
  title,
  status,
  todos,
  color,
  headerColor,
}: TodoColumnProps) {
  return (
    <div className={`rounded-lg border-2 ${color} h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] flex flex-col`}>
      <div className={`${headerColor} px-4 py-3 rounded-t-lg flex-shrink-0`}>
        <h2 className="font-semibold text-lg flex items-center justify-between">
          {title}
          <span className="bg-white bg-opacity-70 text-sm px-2 py-1 rounded-full">
            {todos.length}
          </span>
        </h2>
      </div>

      {/* 드롭 가능한 영역 */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-4 flex-1 overflow-y-auto transition-colors duration-200 ${
              snapshot.isDraggingOver ? "bg-blue-50 bg-opacity-50" : ""
            }`}
          >
            {todos.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">할일이 없습니다</p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default memo(TodoColumn);
