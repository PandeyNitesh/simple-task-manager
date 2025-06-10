import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-gray-200 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-10 text-center shadow-xl">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Welcome to TaskManager
        </h1>
        <p className="mb-6 text-gray-600">
          Track your work efficiently and stay organized.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/login")}
            className="w-full rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="w-full rounded-md border border-gray-700 px-6 py-2 text-gray-800 hover:bg-gray-100"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
