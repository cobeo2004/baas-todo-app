import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/types/supabase";
import { Todo } from "@/lib/types/hooks.types";
import type { RealtimeConfig, RealtimeResponse } from "@/lib/types/hooks.types";

export function useRealtimeSupabase<
  T extends keyof Database["public"]["Tables"],
  S extends keyof Database["public"]["Tables"]["todos"]["Row"],
>(collection: T, config: RealtimeConfig<T, S>): RealtimeResponse {
  const supabase = createClient();
  const [data, setData] = React.useState<Todo[] | null>([]);

  const initialQuery = useQuery({
    queryKey: [collection],
    queryFn: async () => {
      const { data } = await supabase
        .from(collection)
        .select("*")
        .eq("user_id", config.user?.id ?? "");

      if (data) {
        setData(data as Todo[]);
      }
      return data as Todo[];
    },
    ...config.queryOptions,
  });

  React.useEffect(() => {
    if (initialQuery.data) {
      setData(initialQuery.data);
    }

    supabase
      .channel(config.topic ?? "*")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: collection,
        },
        (payload: {
          schema: string;
          table: string;
          commit_timestamp: string;
          eventType: "INSERT" | "UPDATE" | "DELETE";
          new: Todo;
          old: Partial<Todo>;
          errors: null;
        }) => {
          console.log("Event received:", payload);
          switch (payload.eventType) {
            case "INSERT":
              setData((prev) => [...(prev ?? []), payload.new]);
              break;
            case "UPDATE":
              setData(
                (prev) =>
                  prev?.map((record) =>
                    record.id === payload.new.id ? payload.new : record
                  ) ?? null
              );
              break;
            case "DELETE":
              setData(
                (prev) =>
                  prev?.filter((record) => record.id !== payload.old.id) ?? null
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.channel(config.topic ?? "*").unsubscribe();
    };
  }, [collection, config.topic, config.user?.id, initialQuery.data]);

  return {
    initialQuery,
    data: data ?? [],
  };
}
