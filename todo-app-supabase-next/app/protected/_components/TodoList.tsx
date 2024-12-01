"use client";

import { useTodos } from "@/hooks/useTodos";
import { User } from "@supabase/supabase-js";
import { TodoItem } from "./TodoItem";

export function TodoList({ user }: { user: User }) {
  const { todos, toggleTodo, deleteTodo, initialQuery } = useTodos(
    user as User
  );
  if (initialQuery.isLoading) {
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
            toggleTodo.mutate({ todoId: id, isCompleted: !todo.is_completed })
          }
          onDelete={(id) => deleteTodo.mutate(id)}
        />
      ))}
    </div>
  );
}
