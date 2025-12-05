import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "aditya.pal32742@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br />${message}</p>
      `,
    });

    const id = (response as any).id ?? (response as any).data?.id ?? null;
    return res.status(200).json({ success: true, id });
  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);
    return res.status(500).json({
      error: "Email sending failed",
      details: error.message,
    });
  }
}
