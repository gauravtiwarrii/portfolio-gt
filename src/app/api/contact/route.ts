import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TO_EMAIL = "igauravtiwari1096@gmail.com";
const messagesFile = path.join(process.cwd(), "data/messages.json");

/** Submitted text lands inside an HTML email — escape before interpolating. */
function esc(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function saveToFile(entry: object) {
    try {
        const dataDir = path.join(process.cwd(), "data");
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        let messages: object[] = [];
        if (fs.existsSync(messagesFile)) {
            messages = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
        }
        messages.unshift(entry);
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    } catch {
        // Non-critical — best-effort backup only
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const entry = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString(),
        read: false,
    };

    // ── Attempt Resend delivery ──────────────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
        try {
            const { Resend } = await import("resend");
            const resend = new Resend(apiKey);

            const { error } = await resend.emails.send({
                from: "Portfolio Contact <onboarding@resend.dev>",
                to: [TO_EMAIL],
                replyTo: email.trim(),
                subject: `[Portfolio] New message from ${name.trim()}`,
                text: `Name:    ${name.trim()}\nEmail:   ${email.trim()}\n\nMessage:\n${message.trim()}`,
                html: `
                    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#ffffff;color:#171717;padding:32px;max-width:560px">
                      <p style="margin:0 0 24px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#737373">New message via gauravtiwari.dev</p>
                      <table style="width:100%;border-collapse:collapse;font-size:14px">
                        <tr><td style="color:#737373;padding:6px 0;width:72px">From</td><td style="color:#171717">${esc(name.trim())} &lt;${esc(email.trim())}&gt;</td></tr>
                        <tr><td style="color:#737373;padding:6px 0">Received</td><td style="color:#171717">${new Date().toISOString()}</td></tr>
                      </table>
                      <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
                      <div style="font-size:15px;line-height:1.7;white-space:pre-wrap">${esc(message.trim())}</div>
                    </div>`,
            });

            saveToFile(entry);

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ success: true });
        } catch (err) {
            // Fall through to file-only mode
            console.error("Resend error:", err);
        }
    }

    // ── No API key — save locally only (dev mode) ────────────────────
    saveToFile(entry);
    console.log("[Contact] No RESEND_API_KEY — saved locally:", entry);
    return NextResponse.json({ success: true });
}
