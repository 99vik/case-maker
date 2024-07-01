import { signIn } from "@/auth";

export default function Page() {
  return (
    <div className="absolute top-0 flex h-screen w-screen items-center justify-center bg-secondary">
      <div className="rounded-xl bg-background p-8">
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <button type="submit">Sign in with GitHub</button>
        </form>
      </div>
    </div>
  );
}
