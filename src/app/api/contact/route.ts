import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const maxLen = (s: string, n: number) => s.length <= n;
const minLen = (s: string, n: number) => s.length >= n;

const emailOk = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()) && s.length <= 254;

export async function POST(request: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!key || !to || !emailOk(to)) {
    return NextResponse.json(
      {
        error: "Contact is not available right now. Please try again later.",
      },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const fromEmail = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!minLen(name, 1) || !maxLen(name, 120)) {
    return NextResponse.json(
      { error: "Please enter your name (1–120 characters)." },
      { status: 400 }
    );
  }
  if (!emailOk(fromEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!minLen(message, 10) || !maxLen(message, 5000)) {
    return NextResponse.json(
      { error: "Please enter a message of at least 10 characters (max 5,000)." },
      { status: 400 }
    );
  }

  const from = process.env.RESEND_FROM ?? "Iota Alpha Website <onboarding@resend.dev>";
  const resend = new Resend(key);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: fromEmail,
    subject: `Website message from ${name}`,
    text: `From: ${name} <${fromEmail}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json(
      { error: "Message could not be sent. Please try again in a few minutes." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
