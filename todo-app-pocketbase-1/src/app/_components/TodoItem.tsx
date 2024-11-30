"use client";

import { format } from "date-fns";
import { Todo } from "@/lib/types";
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
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
        />
        <div>
          <h3
            className={`font-medium ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </h3>
          <p className="text-sm text-gray-500">{todo.description}</p>
          <p className="text-xs text-gray-400">
            Due: {format(new Date(todo.dueDate ?? ""), "PPP")}
          </p>
        </div>
      </div>
      <Button variant="destructive" size="sm" onClick={() => onDelete(todo.id)}>
        Delete
      </Button>
    </div>
  );
}
