import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'harsh.work.098@gmail.com',
        pass: 'lujg ysoa sjjj nvoi',
      },
    });

    // 1. Email to the owner (you)
    const mailOptionsToOwner = {
      from: '"Portfolio Contact Form" <harsh.work.098@gmail.com>',
      to: 'harsh.work.098@gmail.com',
      replyTo: email,
      subject: `[Portfolio] New Message from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="padding: 12px; border-left: 4px solid #00A3FF; background: #f9f9f9; color: #333;">
          ${message.replace(/\n/g, '<br/>')}
        </p>
      `,
    };

    // 2. Automated reply to the user who sent the form
    const mailOptionsToUser = {
      from: '"Harsh Manmode" <harsh.work.098@gmail.com>',
      to: email,
      subject: `Thank You for Reaching Out!`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h3>Hi ${name},</h3>
          <p>Thank you for getting in touch! I have received your message and will get back to you as soon as possible.</p>
          <p>Here is a copy of your message:</p>
          <blockquote style="padding: 12px; border-left: 4px solid #00A3FF; background: #f4f4f4; color: #555;">
            <em>${message.replace(/\n/g, '<br/>')}</em>
          </blockquote>
          <br/>
          <p>Best Regards,</p>
          <p><strong>Harsh Manmode</strong></p>
          <p><a href="mailto:harsh.work.098@gmail.com">harsh.work.098@gmail.com</a></p>
        </div>
      `,
    };

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(mailOptionsToOwner),
      transporter.sendMail(mailOptionsToUser)
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
