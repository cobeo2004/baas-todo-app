"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { Database } from "@/lib/types/supabase";
import { useRealtimeSupabase } from "./useRealtime";
type TodoInput = Omit<
  Database["public"]["Tables"]["todos"]["Row"],
  "id" | "inserted_at" | "updated_at"
>;
export function useTodos(user: User) {
  const supabase = createClient();
  const { data: todos, initialQuery } = useRealtimeSupabase("todos", {
    user,
    queryOptions: {
      staleTime: Infinity,
    },
  });
  const addTodo = useMutation({
    mutationFn: async (newTodo: TodoInput) => {
      await supabase.from("todos").insert({
        ...newTodo,
        user_id: user.id,
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
      await supabase
        .from("todos")
        .update({
          is_completed: isCompleted,
        })
        .eq("id", todoId);
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (todoId: string) => {
      await supabase.from("todos").delete().eq("id", todoId);
    },
  });

  return {
    todos,
    initialQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
