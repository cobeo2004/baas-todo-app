import React from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export const useUser = () => {
  const supabase = createClient();
  const [user, setUser] = React.useState<User | null>(null);
  const internal_getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };
  React.useEffect(() => {
    internal_getUser();
  }, []);
  return user;
};
