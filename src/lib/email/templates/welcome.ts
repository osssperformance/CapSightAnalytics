interface WelcomeEmailProps {
  userName?: string
  userEmail: string
  loginUrl: string
}

export function generateWelcomeEmail({ userName, userEmail, loginUrl }: WelcomeEmailProps) {
  const displayName = userName || userEmail.split('@')[0]

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CapSight Analytics</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                CapSight Analytics
              </h1>
              <p style="margin: 10px 0 0; color: #dbeafe; font-size: 16px;">
                Never miss another ASX commodities announcement
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: 600;">
                Welcome, ${displayName}! 👋
              </h2>

              <p style="margin: 0 0 16px; color: #4b5563; font-size: 16px; line-height: 24px;">
                Thanks for joining CapSight Analytics! You now have access to Australia's most comprehensive ASX commodities event calendar.
              </p>

              <p style="margin: 0 0 16px; color: #4b5563; font-size: 16px; line-height: 24px;">
                Here's what you can do:
              </p>

              <ul style="margin: 0 0 24px; padding-left: 20px; color: #4b5563; font-size: 16px; line-height: 28px;">
                <li><strong>Track 100+ ASX Companies</strong> – Lithium, rare earths, copper, nickel, and more</li>
                <li><strong>Never Miss Critical Events</strong> – Drilling results, JORC updates, feasibility studies</li>
                <li><strong>Custom Watchlists</strong> – Follow up to 10 companies (free tier)</li>
                <li><strong>AI-Powered Insights</strong> – Event importance scoring and recommendations</li>
              </ul>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td align="center">
                    <a href="${loginUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      View Calendar
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                <strong>Quick Tip:</strong> Add companies to your watchlist to receive personalized email alerts when they announce new events.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 20px; text-align: center;">
                Need help? Reply to this email or visit our support center.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                CapSight Analytics | ASX Commodities Event Calendar<br>
                © ${new Date().getFullYear()} CapSight Analytics. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const text = `
Welcome to CapSight Analytics, ${displayName}!

Thanks for joining! You now have access to Australia's most comprehensive ASX commodities event calendar.

What you can do:
- Track 100+ ASX Companies (Lithium, rare earths, copper, nickel, and more)
- Never Miss Critical Events (Drilling results, JORC updates, feasibility studies)
- Custom Watchlists (Follow up to 10 companies on free tier)
- AI-Powered Insights (Event importance scoring and recommendations)

Get started: ${loginUrl}

Quick Tip: Add companies to your watchlist to receive personalized email alerts when they announce new events.

Need help? Reply to this email or visit our support center.

CapSight Analytics | ASX Commodities Event Calendar
© ${new Date().getFullYear()} CapSight Analytics. All rights reserved.
  `

  return {
    subject: 'Welcome to CapSight Analytics 🚀',
    html,
    text,
  }
}
