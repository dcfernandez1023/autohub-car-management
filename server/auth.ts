/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export const signup = async (email: string, password: string, host: string) => {
  if (!host) throw new Error("Missing host for redirect");
  const authResponse: AuthResponse = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${host}/confirm` },
  });

  if (authResponse.error) throw authResponse.error;
  return authResponse.data;
};

export const signIn = async (email: string, password: string) => {
  const authResponse: AuthResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authResponse.error) throw authResponse.error;

  return authResponse.data;
};

export const completeSignup = async (accessToken: string) => {
  const authResponse = await supabase.auth.getUser(accessToken);
  if (authResponse.error) throw authResponse.error;
};

export const getUser = async (accessToken?: string) => {
  try {
    return (await supabase.auth.getUser(accessToken)).data.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};
