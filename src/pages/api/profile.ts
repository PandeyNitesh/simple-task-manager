// src/pages/api/profile.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db"; // Adjust if your prisma client path is different

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  if (typeof email !== "string") {
    return res.status(400).json({ error: "Email is required as a string" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
