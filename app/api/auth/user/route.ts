import { createSupabaseClient } from "@/server/supabase";

export const GET = async () => {
  try {
    const userData = await createSupabaseClient().auth.getUser();
    if (userData.error) throw userData.error;
    return new Response(JSON.stringify(userData.data.user), { status: 200 });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
