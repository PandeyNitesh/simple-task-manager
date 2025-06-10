import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      setError("Invalid email or password");
    } else {
      return router.replace("/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 w-full rounded border p-2"
          required
        />

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded bg-black py-2 text-white"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
