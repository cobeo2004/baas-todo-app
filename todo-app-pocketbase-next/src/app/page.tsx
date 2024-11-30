"use client";

import { useTodos } from "@/hooks/useTodos";
import { TodoForm } from "./_components/TodoForm";
import { TodoList } from "./_components/TodoList";
import { useRouter } from "next/navigation";
import { usePbAuth } from "./_components/PBAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersRecord } from "@/lib/types/pocketbase";

export default function Home() {
  const { user, signOut } = usePbAuth();
  const { addTodo } = useTodos(user as unknown as UsersRecord);
  const router = useRouter();
  const handleLogin = () => {
    router.push("/signin");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            PocketList (Pocketbase + Next.js)
          </h1>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="mb-8">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.name}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              className="text-3xl font-bold text-gray-900 mb-8"
              onClick={handleLogin}
            >
              Sign in
            </button>
          )}
        </div>
        <div className="space-y-8">
          <TodoForm
            onSubmit={(todo) => {
              addTodo.mutate(todo);
            }}
          />
          <TodoList />
        </div>
      </div>
    </main>
  );
}
