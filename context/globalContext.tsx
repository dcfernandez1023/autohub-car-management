/* eslint-disable no-unused-vars */
import React from "react";
import { User } from "@supabase/supabase-js";

interface IGlobalContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: null,
  setUser: () => {},
});
