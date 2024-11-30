"use client";

import { UsersRecord } from "@/lib/types/pocketbase";
import { usePbAuth } from "./PBAuthContext";
import { TodoItem } from "./TodoItem";
import { useTodos } from "@/hooks/useTodos";

export function TodoList() {
  const { user, isLoading: isAuthLoading } = usePbAuth();
  const { todos, toggleTodo, deleteTodo, initialQuery } = useTodos(
    user as unknown as UsersRecord
  );
  if (initialQuery.isLoading || isAuthLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }
  if (!user) return;
  return (
    <div className="space-y-4">
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={(id) =>
            toggleTodo.mutate({ todoId: id, isCompleted: !todo.completed })
          }
          onDelete={(id) => deleteTodo.mutate(id)}
        />
      ))}
    </div>
  );
}
