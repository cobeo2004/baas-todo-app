import type { UseQueryResult } from "@tanstack/react-query";
import type { RecordModel } from "pocketbase";
import type {
  CollectionRecords,
  TodoRecord,
  UsersRecord,
} from "./types/pocketbase";
import type { UndefinedInitialDataOptions } from "@tanstack/react-query";

export type Todo = TodoRecord;
export type QueryOptions<T extends keyof CollectionRecords> = Omit<
  Partial<
    UndefinedInitialDataOptions<RecordModel[], Error, RecordModel[], T[]>
  >,
  "queryKey" | "queryFn"
>;

export type RealtimeConfig<T extends keyof CollectionRecords> = {
  user?: UsersRecord;
  topic?: string;
  queryOptions?: QueryOptions<T>;
};

export type RealtimeResponse = {
  data: RecordModel[];
  initialQuery: UseQueryResult<RecordModel[], Error>;
};

export type TodoInput = Omit<Todo, "id" | "completed">;
