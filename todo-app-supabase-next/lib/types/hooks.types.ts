import type {
  UndefinedInitialDataOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type { Database } from "./supabase";
import { User } from "@supabase/supabase-js";
export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type QueryOptions<T extends keyof Database["public"]["Tables"]> = Omit<
  Partial<UndefinedInitialDataOptions<Todo[], Error, Todo[], T[]>>,
  "queryKey" | "queryFn"
>;

export type RealtimeConfig<T extends keyof Database["public"]["Tables"]> = {
  user?: User;
  topic?: string;
  queryOptions?: QueryOptions<T>;
};

export type RealtimeResponse = {
  data: Todo[];
  initialQuery: UseQueryResult<Todo[], Error>;
};

export type TodoInput = Omit<
  Todo,
  "id" | "is_completed" | "user_id" | "inserted_at" | "updated_at"
>;
