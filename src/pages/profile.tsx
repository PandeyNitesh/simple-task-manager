import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({
    email: "",
    theme: "light",
    description: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/profile?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data from profile :", data);
          if (data) setProfile(data);
        });
    }
  }, [session]);

  const handleSave = async () => {
    const res = await fetch("/api/editprofile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    alert(data.message || "Profile updated");
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Your Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">Email (not editable)</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full rounded border bg-gray-100 p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Description</label>
          <textarea
            value={profile.description}
            onChange={(e) =>
              setProfile({ ...profile, description: e.target.value })
            }
            className="w-full rounded border p-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
