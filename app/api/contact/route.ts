import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { serviceOptions } from "@/data/services";
import { personal } from "@/data/personal";

export const runtime = "nodejs";

// Best-effort, per-instance rate limit (use a shared store such as Upstash on serverless for strict limits).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: pretend success to bots, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", error: "Too many messages. Please try again later. Your message was NOT sent." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || personal.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json({ ok: false, code: "not_configured", error: "Email delivery is not configured." }, { status: 503 });
  }

  const serviceLabel = serviceOptions.find((s) => s.value === data.service)?.label ?? data.service;
  const html = `
    <h2>New portfolio enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <hr/><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject}`,
        html,
        text: `Name: ${data.name}\nEmail: ${data.email}\nService: ${serviceLabel}\n\n${data.message}`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { ok: false, code: "send_failed", error: "The email service rejected the message, so it was NOT sent." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed", err);
    return NextResponse.json(
      { ok: false, code: "send_failed", error: "Could not reach the email service, so your message was NOT sent." },
      { status: 502 },
    );
  }
}
