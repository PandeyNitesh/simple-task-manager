import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const priorities = ["Low", "Medium", "High"];
const tags = ["Frontend", "Backend", "DevOps"];

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    deadline: "",
    priority: "Medium",
    tag: "Frontend",
    createdBy: "",
  });
  const [tasks, setTasks] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.email) {
      //@ts-ignore
      setTask((prev) => ({ ...prev, createdBy: session.user.email }));
      fetchTasks(session.user.email);
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/members");
        const data = await res.json();
        setTeamMembers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const fetchTasks = async (email: string) => {
    try {
      const res = await fetch(`/api/task?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create task");
      //@ts-ignore
      fetchTasks(session.user.email);
      setTasks([...tasks, data.task]);
      setTask({
        title: "",
        description: "",
        assignee: "",
        deadline: "",
        priority: "Medium",
        tag: "Frontend",
        createdBy: session?.user?.email || "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Failed to submit task:", error);
      alert("Task creation failed. Check console for details.");
    }
  };

  return (
    <main className="p-6">
      <section className="mb-6 flex justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create New Task
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Profile Setting
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">New Task</h2>
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                required
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full rounded border p-2"
              />

              <textarea
                placeholder="Description"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                className="w-full rounded border p-2"
              />

              <select
                value={task.assignee}
                onChange={(e) => setTask({ ...task, assignee: e.target.value })}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Select Assignee</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.email}>
                    {member.name || member.email}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                className="w-full rounded border p-2"
              />

              <input
                type="text"
                //@ts-ignore
                value={session?.user?.name}
                disabled
                className="w-full rounded border p-2"
              />

              <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                className="w-full rounded border p-2"
              >
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>

              <select
                value={task.tag}
                onChange={(e) => setTask({ ...task, tag: e.target.value })}
                className="w-full rounded border p-2"
              >
                {tags.map((tag) => (
                  <option key={tag}>{tag}</option>
                ))}
              </select>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="rounded bg-green-600 px-4 py-2 text-white"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="rounded-xl bg-white p-6 shadow-md">
        <h3 className="mb-2 text-lg font-medium">Tasks</h3>
        {tasks.map((t, i) => (
          <>
            <h2 className="text-[1.5rem] font-bold">{t.title}</h2>
            <aside className="mb-2 mt-2 flex gap-[2rem]">
              <h5>Priority</h5>
              <p className="font-bold">{t.priority}</p>
            </aside>
            <aside className="mb-2 mt-2 flex gap-[2rem]">
              <h5>Description</h5>
              <p>{t.description}</p>
            </aside>
            <aside className="mb-2 mt-2 flex gap-[2rem]">
              <h5>Asignee</h5>
              <p>{t.assignee}</p>
            </aside>
            <aside className="mb-2 mt-2 flex gap-[2rem]">
              <h5>Created By</h5>
              <p>{t.createdBy}</p>
            </aside>
            <aside className="mb-2 mt-2 flex gap-[2rem]">
              <h5>Deadline</h5>
              <p>{t.deadline}</p>
            </aside>
          </>
        ))}

        {/* <ul className="space-y-2">
          {tasks.map((t, i) => (
            <li key={i} className="rounded border p-2">
              <strong>{t.title}</strong> ({t.priority} / {t.tag})<br />
              <small>
                Description: {t.description}
                <br />
                Assigned to: {t.assignee} | Created by: {t.createdBy} | Due:{" "}
                {t.deadline}
              </small>
            </li>
          ))}
        </ul> */}
      </section>
    </main>
  );
}
