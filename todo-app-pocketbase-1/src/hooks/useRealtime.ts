import React from "react";
import { pb } from "@/lib/pocketbase";
import { CollectionRecords } from "@/lib/types/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { RealtimeConfig, RealtimeResponse } from "@/lib/types";
import { RecordModel } from "pocketbase";

export function useRealtimePocketbase<T extends keyof CollectionRecords>(
  collection: T,
  config: RealtimeConfig<T>
): RealtimeResponse {
  const [data, setData] = React.useState<RecordModel[]>([]);
  const initialQuery = useQuery({
    queryKey: [collection],
    queryFn: async () => {
      console.log(config.user?.id);
      const data = await pb.collection(collection).getFullList({
        filter: config.user && `user="${config.user.id}"`,
      });
      setData(data);
      return data;
    },
    ...config.queryOptions,
  });

  React.useEffect(() => {
    if (initialQuery.data) {
      setData(initialQuery.data);
    }

    pb.collection(collection).subscribe(
      config.topic ?? "*",
      (e) => {
        switch (e.action) {
          case "create":
            setData((prev) => [...prev, e.record]);
            break;
          case "update":
            setData((prev) =>
              prev.map((record) =>
                record.id === e.record.id ? e.record : record
              )
            );
            break;
          case "delete":
            setData((prev) =>
              prev.filter((record) => record.id !== e.record.id)
            );
            break;
        }
      },
      {
        filter: config.user && `user="${config.user.id}"`,
      }
    );

    return () => {
      pb.collection(collection).unsubscribe(config.topic ?? "*");
    };
  }, []);

  return {
    initialQuery,
    data,
  };
}
