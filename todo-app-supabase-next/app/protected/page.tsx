import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TodoList } from "./_components/TodoList";
import { TodoForm } from "./_components/TodoForm";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-8">
      <TodoForm user={user} />
      <TodoList user={user} />
    </div>
  );
}
