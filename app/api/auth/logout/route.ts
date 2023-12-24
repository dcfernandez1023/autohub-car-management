import { createSupabaseClient } from "@/server/supabase";

export const POST = async () => {
  try {
    const authError = await createSupabaseClient().auth.signOut();
    if (authError.error) throw authError.error;
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (e: unknown) {
    console.error(e);
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
