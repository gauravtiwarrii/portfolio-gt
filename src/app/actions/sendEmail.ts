"use server";

import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmailAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "Missing required fields." };
    }

    if (!resend) {
        console.log("Mock Email Sent (No API Key found):", { name, email, message });
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return { success: true, message: "Mock message sent successfully!" };
    }

    try {
        const data = await resend.emails.send({
            from: "Portfolio Contact Form <onboarding@resend.dev>", // default testing email for Resend
            to: ["your-email@example.com"], // We can replace this later or use env variable
            subject: `New Contact Request from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (data.error) {
            return { error: data.error.message };
        }

        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        return { error: "An unexpected error occurred." };
    }
}
