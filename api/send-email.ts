import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  try {
    await resend.emails.send({
      from: "contact@yourdomain.com", // or onboarding@resend.dev
      to: "aditya.pal32742@gmail.com",
      subject: `Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to send email" });
  }
};
