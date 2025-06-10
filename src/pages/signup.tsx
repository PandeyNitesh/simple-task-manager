import { useState } from "react";
import { useRouter } from "next/router";
// import bcrypt from "bcryptjs";

export default function SignUp() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("/api/createuser", {
      method: "POST",
      body: JSON.stringify({ name: username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Signup failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="mb-4 w-full rounded border p-2"
          required
        />
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
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
