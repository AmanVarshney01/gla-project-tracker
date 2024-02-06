import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);
  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.full_name} {user.email}!
      <form action={signOut}>
        <button className="rounded-md px-4 py-2 no-underline">Logout</button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="flex rounded-md px-3 py-2 no-underline">
      Login
    </Link>
  );
}
