"use client";

import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { Todo, TodoInput } from "@/lib/types";
import { pb } from "@/lib/pocketbase";
import { useRealtimePocketbase } from "./useRealtime";
import { UsersRecord } from "@/lib/types/pocketbase";

export function useTodos(user: UsersRecord) {
  const { data: todos, initialQuery } = useRealtimePocketbase("todo", {
    user: user as unknown as UsersRecord,
    queryOptions: {
      staleTime: Infinity,
    },
  }) as {
    data: Todo[];
    initialQuery: UseQueryResult<Todo[], Error>;
  };

  const addTodo = useMutation({
    mutationFn: async (newTodo: TodoInput) => {
      await pb.collection("todo").create({
        ...newTodo,
        user: user?.id,
      });
    },
  });

  const toggleTodo = useMutation({
    mutationFn: async ({
      todoId,
      isCompleted,
    }: {
      todoId: string;
      isCompleted: boolean;
    }) => {
      await pb.collection("todo").update(todoId, {
        completed: isCompleted,
      });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (todoId: string) => {
      await pb.collection("todo").delete(todoId);
    },
  });

  return {
    initialQuery,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
