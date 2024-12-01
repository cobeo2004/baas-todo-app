"use client";

import { format } from "date-fns";
import { Todo } from "@/lib/types/hooks.types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={todo.is_completed ?? false}
          onCheckedChange={() => onToggle(todo.id.toString())}
        />
        <div>
          <h3
            className={`font-medium ${
              todo.is_completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.task}
          </h3>
          <p className="text-sm text-gray-500">{todo.description}</p>
          <p className="text-xs text-gray-400">
            Due: {format(new Date(todo.due_date ?? ""), "PPP")}
          </p>
        </div>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(todo.id.toString())}
      >
        Delete
      </Button>
    </div>
  );
}
