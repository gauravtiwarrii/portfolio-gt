import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const messagesFile = path.join(process.cwd(), "data/messages.json");

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Basic email validation
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

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    let messages = [];
    if (fs.existsSync(messagesFile)) {
        messages = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
    }
    messages.unshift(entry);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true });
}
