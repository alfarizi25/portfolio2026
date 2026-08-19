"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  // 1. Basic honeypot check
  const botField = formData.get("bot-field");
  if (botField !== "") {
    // If the hidden field is filled, silently reject it (bot behavior)
    return { error: "Invalid submission" };
  }

  // 2. Extract data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = (formData.get("subject") as string) || "Pesan dari Portfolio";
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Semua kolom (Nama, Email, Pesan) wajib diisi." };
  }

  try {
    // 3. Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ale.alfarizi12@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>Ada pesan baru dari pengunjung Portfolio Anda!</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; color: #555;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: "Gagal mengirim pesan. Silakan coba lagi nanti." };
    }

    return { success: true };
  } catch (err) {
    console.error("Server Error:", err);
    return { error: "Terjadi kesalahan internal. Silakan coba lagi nanti." };
  }
}
