import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, theme, description } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    await prisma.user.update({
      where: { email },
      //@ts-ignore
      data: { description },
    });

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update failed:", err);
    return res.status(500).json({ error: "Failed to update profile" });
  }
}
