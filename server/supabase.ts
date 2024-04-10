// "use server";

import { createClient } from "@supabase/supabase-js";

// import { type CookieOptions, createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export const createSupabaseClient = () => {
//   const cookieStore = cookies();
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//           cookieStore.set({ name, value, ...options });
//         },
//         remove(name: string, options: CookieOptions) {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//           cookieStore.delete({ name, ...options });
//         },
//       },
//     },
//   );
// };

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
