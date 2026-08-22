/**
 * Quick SMTP Test Utility
 * Run with: node scripts/test-email.mjs
 */

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load environment variables manually from .env.local if present
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...rest] = trimmed.split("=");
          const value = rest.join("=").trim().replace(/^["'](.*)["']$/, "$1");
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value;
          }
        }
      }
    }
  }
}

loadEnv();

const smtpService = process.env.SMTP_SERVICE;
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
const smtpSecure =
  process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === "true"
    : smtpPort === 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const receiverEmail =
  process.env.CONTACT_RECEIVER_EMAIL || "nahidankur@gmail.com";

console.log("\n=======================================================");
console.log("   Nodemailer Contact Form SMTP Diagnostic Test");
console.log("=======================================================\n");

console.log("Configuration detected:");
console.log(`- Service:   ${smtpService || "Custom SMTP"}`);
console.log(`- Host:      ${smtpHost}`);
console.log(`- Port:      ${smtpPort}`);
console.log(`- SSL/TLS:   ${smtpSecure}`);
console.log(`- User:      ${smtpUser ? smtpUser : "[MISSING] - Please configure in .env.local"}`);
console.log(`- Pass:      ${smtpPass ? "******** (configured)" : "[MISSING] - Please configure in .env.local"}`);
console.log(`- Receiver:  ${receiverEmail}\n`);

if (!smtpUser || !smtpPass) {
  console.error("❌ ERROR: SMTP_USER or SMTP_PASS is missing in .env.local!");
  console.log("\nTo configure:");
  console.log("1. Open .env.local");
  console.log("2. Set SMTP_USER=your_email@gmail.com");
  console.log("3. Generate a 16-character App Password at https://myaccount.google.com/apppasswords");
  console.log("4. Set SMTP_PASS=your_16_char_app_password");
  console.log("5. Run this test again: node scripts/test-email.mjs\n");
  process.exit(1);
}

const transporterConfig = smtpService
  ? {
      service: smtpService,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10000,
    }
  : {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10000,
    };

const transporter = nodemailer.createTransport(transporterConfig);

console.log("📡 Step 1: Testing SMTP connection and handshake...");

transporter.verify(async (error, success) => {
  if (error) {
    console.error("❌ SMTP Verification Failed!");
    console.error(`Error Code: ${error.code || "N/A"}`);
    console.error(`Error Message: ${error.message}\n`);

    if (error.code === "EAUTH") {
      console.log("💡 Tip: Authentication failed.");
      console.log("   For Gmail accounts, you cannot use your regular account password.");
      console.log("   Generate a 16-character 'App Password' at: https://myaccount.google.com/apppasswords\n");
    }
    process.exit(1);
  }

  console.log("✅ SMTP Server is ready and authenticated successfully!\n");

  console.log("📤 Step 2: Sending diagnostic test email to " + receiverEmail + "...");

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${smtpUser}>`,
      to: receiverEmail,
      subject: "🧪 Nodemailer Diagnostic Test — Portfolio Contact Form",
      text: "Hello! This is a test email confirming that your Nodemailer configuration is working properly.",
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #22d3ee; margin-top: 0;">✓ Nodemailer is Working!</h2>
          <p>Your portfolio contact form SMTP configuration has been verified successfully.</p>
          <hr style="border: 0; border-top: 1px solid #334155; margin: 16px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">Sent via Portfolio Nodemailer Diagnostic Utility</p>
        </div>
      `,
    });

    console.log("🎉 Test email sent successfully!");
    console.log(`- Message ID: ${info.messageId}`);
    console.log(`- Response:   ${info.response}\n`);
  } catch (sendError) {
    console.error("❌ Failed to send test email:", sendError.message);
  }
});
