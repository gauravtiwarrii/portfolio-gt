import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TO_EMAIL = "igauravtiwari1096@gmail.com";
const messagesFile = path.join(process.cwd(), "data/messages.json");

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
                    <div style="font-family:monospace;background:#0a0a0a;color:#e5e5e5;padding:32px;border-radius:8px;border:1px solid #1f1f1f">
                      <div style="color:#2dd4bf;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin-bottom:24px">// Portfolio Secure_Channel — Incoming Transmission</div>
                      <table style="width:100%;border-collapse:collapse">
                        <tr><td style="color:#71717a;padding:4px 0;font-size:12px;width:80px">FROM</td><td style="color:#e5e5e5;font-size:13px">${name.trim()} &lt;${email.trim()}&gt;</td></tr>
                        <tr><td style="color:#71717a;padding:4px 0;font-size:12px">TIME</td><td style="color:#e5e5e5;font-size:13px">${new Date().toISOString()}</td></tr>
                      </table>
                      <hr style="border:none;border-top:1px solid #1f1f1f;margin:20px 0"/>
                      <div style="color:#71717a;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px">Payload_Message</div>
                      <div style="color:#d4d4d4;font-size:14px;line-height:1.7;white-space:pre-wrap">${message.trim()}</div>
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
