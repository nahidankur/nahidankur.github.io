import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, _gotcha } = body;

    // 1. Bot Honeypot Protection (if filled by bot, silently return success without sending)
    if (_gotcha) {
      console.warn("Honeypot field filled. Silently ignoring submission.");
      return NextResponse.json({
        success: true,
        message: "Message dispatched successfully.",
      });
    }

    // 2. Input Validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return NextResponse.json(
        { error: "All fields (Name, Email, Subject, and Message) are required." },
        { status: 400 }
      );
    }

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name cannot exceed 100 characters." },
        { status: 400 }
      );
    }

    if (trimmedSubject.length > 150) {
      return NextResponse.json(
        { error: "Subject cannot exceed 150 characters." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: "Message cannot exceed 5000 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 3. SMTP Configuration & Environment Checks
    const smtpService = process.env.SMTP_SERVICE; // e.g. "gmail"
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    
    // Auto-detect secure setting: port 465 uses SSL/TLS (true), port 587 uses STARTTLS (false)
    const smtpSecure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : smtpPort === 465;

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "nahidankur@gmail.com";

    if (!smtpUser || !smtpPass) {
      console.warn(
        "Nodemailer warning: SMTP_USER or SMTP_PASS is missing in environment variables (.env.local)."
      );
      return NextResponse.json(
        {
          error:
            "SMTP server credentials are not configured yet. Please configure SMTP_USER and SMTP_PASS in .env.local to enable email delivery.",
        },
        { status: 503 }
      );
    }

    // 4. Create Nodemailer Transporter with connection timeouts
    const transporterConfig: nodemailer.TransportOptions | any = smtpService
      ? {
          service: smtpService,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
        }
      : {
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
        };

    const transporter = nodemailer.createTransport(transporterConfig);

    const formattedDate = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Dhaka",
    });

    // 5. Clean & Modern HTML Email Template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Message</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #090d16;
            color: #f1f5f9;
            margin: 0;
            padding: 24px 12px;
          }
          .container {
            max-width: 620px;
            margin: 0 auto;
            background-color: #0f172a;
            border: 1px solid rgba(148, 163, 184, 0.15);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          }
          .header {
            background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
            padding: 24px 30px;
            color: #090d16;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          .header p {
            margin: 4px 0 0;
            font-size: 13px;
            font-weight: 600;
            opacity: 0.95;
          }
          .content {
            padding: 28px 30px;
          }
          .field {
            margin-bottom: 20px;
          }
          .field-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #22d3ee;
            margin-bottom: 6px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-weight: 700;
          }
          .field-value {
            font-size: 15px;
            color: #f8fafc;
            line-height: 1.5;
          }
          .message-box {
            background-color: #1e293b;
            border-left: 4px solid #06b6d4;
            padding: 18px 20px;
            border-radius: 8px;
            white-space: pre-wrap;
            font-size: 14px;
            line-height: 1.6;
            color: #e2e8f0;
            font-family: inherit;
          }
          .reply-button-container {
            margin-top: 24px;
            text-align: center;
          }
          .reply-button {
            display: inline-block;
            background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
            color: #090d16 !important;
            font-weight: 700;
            font-size: 13px;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            letter-spacing: 0.02em;
          }
          .footer {
            padding: 18px 30px;
            background-color: #090d16;
            border-top: 1px solid rgba(148, 163, 184, 0.1);
            font-size: 12px;
            color: #64748b;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Portfolio Message Received</h1>
            <p>Direct contact dispatch for Nahid Karim Ankur</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-value"><strong>${trimmedName}</strong></div>
            </div>
            <div class="field">
              <div class="field-label">Reply-To Email</div>
              <div class="field-value">
                <a href="mailto:${trimmedEmail}" style="color: #38bdf8; text-decoration: none;">${trimmedEmail}</a>
              </div>
            </div>
            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${trimmedSubject}</div>
            </div>
            <div class="field">
              <div class="field-label">Message Payload</div>
              <div class="message-box">${trimmedMessage}</div>
            </div>
            <div class="reply-button-container">
              <a href="mailto:${trimmedEmail}?subject=${encodeURIComponent("Re: " + trimmedSubject)}" class="reply-button">
                Reply Directly to ${trimmedName}
              </a>
            </div>
          </div>
          <div class="footer">
            Received on ${formattedDate} (BST) • Dispatched via Portfolio Contact Gateway
          </div>
        </div>
      </body>
    </html>
    `;

    // 6. Send Email via Nodemailer
    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: trimmedEmail,
      subject: `[Portfolio Inquiry] ${trimmedSubject} — from ${trimmedName}`,
      text: `New message from: ${trimmedName} (${trimmedEmail})\nSubject: ${trimmedSubject}\nDate: ${formattedDate}\n\nMessage:\n${trimmedMessage}`,
      html: htmlTemplate,
    });

    return NextResponse.json({
      success: true,
      message: "Message successfully dispatched to inbox.",
    });
  } catch (error: any) {
    console.error("Nodemailer error sending email:", error);

    let clientMessage =
      "An unexpected error occurred while sending your message. Please try again later.";

    if (error?.code === "EAUTH") {
      clientMessage =
        "SMTP Authentication failed. For Gmail, please ensure you are using a 16-character Google App Password (not your normal Gmail password).";
    } else if (error?.code === "ESOCKET" || error?.code === "ETIMEDOUT") {
      clientMessage =
        "Connection to the SMTP email server timed out. Please check network/firewall or SMTP settings.";
    } else if (error?.message) {
      clientMessage = error.message;
    }

    return NextResponse.json(
      {
        error: clientMessage,
      },
      { status: 500 }
    );
  }
}
