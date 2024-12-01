"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TodoInput } from "@/lib/types/hooks.types";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/hooks/useUser";

export function AddTodo() {
  const supabase = createClient();
  const user = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: TodoInput) => {
      return await supabase
        .from("todos")
        .insert({ ...newTodo, user_id: user?.id ?? "" });
    },
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setDueDate("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    addTodoMutation.mutate({
      task: title,
      description,
      due_date: dueDate,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Add Todo
      </Button>
    </form>
  );
}
