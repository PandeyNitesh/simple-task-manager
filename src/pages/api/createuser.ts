import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
//@ts-ignore
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // console.log("checking request")
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { name, email, password } = req.body;

  // Validate
  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({
      error: "Username and Email and password (min 6 chars) required",
    });
  }

  try {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        //@ts-ignore
        name,
        email,
        //@ts-ignore
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
