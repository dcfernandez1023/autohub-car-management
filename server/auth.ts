/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AuthResponse } from "@supabase/supabase-js";
import { createSupabaseClient } from "./supabase";

export const signup = async (email: string, password: string, host: string) => {
  if (!host) throw new Error("Missing host for redirect");
  const authResponse: AuthResponse = await createSupabaseClient().auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${host}/confirm` },
  });

  if (authResponse.error) throw authResponse.error;
  return authResponse.data;
};

export const signIn = async (email: string, password: string) => {
  const authResponse: AuthResponse =
    await createSupabaseClient().auth.signInWithPassword({
      email,
      password,
    });

  if (authResponse.error) throw authResponse.error;

  return authResponse.data;
};

export const completeSignup = async (code: string) => {
  const authResponse =
    await createSupabaseClient().auth.exchangeCodeForSession(code);
  return {
    accessToken: authResponse.data.session?.access_token,
    refreshToken: authResponse.data.session?.refresh_token,
  };
};

export const getUser = async () => {
  try {
    return (await createSupabaseClient().auth.getUser()).data.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};
