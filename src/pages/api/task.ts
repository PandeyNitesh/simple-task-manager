import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { title, description, assignee, deadline, createdBy, priority, tag } =
      req.body;

    if (!title || !assignee || !deadline || !priority || !tag) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      //@ts-ignore
      const task = await prisma.task.create({
        data: {
          title,
          description,
          assignee,
          deadline: new Date(deadline),
          priority,
          tag,
          createdBy,
        },
      });
      return res.status(201).json({ task });
    } catch (error) {
      console.error("Task creation error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    const { email } = req.query;

    if (typeof email !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid email in query" });
    }

    try {
      //@ts-ignore
      const tasks = await prisma.task.findMany({
        where: { assignee: email },
        orderBy: { deadline: "asc" },
      });

      return res.status(200).json({ tasks });
    } catch (error) {
      console.error("Task fetch error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
