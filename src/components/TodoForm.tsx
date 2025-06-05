"use client"

import type React from "react"
import { useState } from "react"
import { Todo } from "../types/Todo"
import { useTodoActions } from "../hooks/useTodoActions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface TodoFormProps {
  todo?: Todo
  onClose: () => void
  onSubmit: () => void
}

// TODO 추가/수정 폼 컴포넌트
export default function TodoForm({ todo, onClose, onSubmit }: TodoFormProps) {
  const { addTodo, updateTodo } = useTodoActions()

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    title: todo?.title || "",
    description: todo?.description || "",
    priority: todo?.priority || ("medium" as Todo["priority"]),
    status: todo?.status || ("todo" as Todo["status"]),
  })

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 제목이 비어있으면 제출하지 않음
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.")
      return
    }

    if (todo) {
      updateTodo(todo.id, formData)
    } else {
      addTodo(formData)
    }

    onSubmit()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">{todo ? "할일 수정" : "새 할일 추가"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="할일 제목을 입력하세요"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="할일에 대한 자세한 설명을 입력하세요"
                className="w-full h-24 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">높음</SelectItem>
                  <SelectItem value="medium">보통</SelectItem>
                  <SelectItem value="low">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {todo && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">해야 할 일</SelectItem>
                    <SelectItem value="inProgress">진행 중</SelectItem>
                    <SelectItem value="completed">완료됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                {todo ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
