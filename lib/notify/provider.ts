export async function sendSMS(to: string, message: string) {
  const provider = process.env.SMS_PROVIDER;
  if (provider === "TWILIO") {
    // integrate Twilio SDK here (omitted in demo)
    console.log("[SMS:TWILIO]", to, message);
  } else if (provider === "MSG91") {
    console.log("[SMS:MSG91]", to, message);
  } else {
    console.log("SMS stub:", to, message);
  }
}

export async function sendWhatsApp(to: string, message: string) {
  console.log("WA stub:", to, message);
}

export async function sendEmail(to: string, subject: string, body: string) {
  console.log("Email stub:", to, subject);
}
