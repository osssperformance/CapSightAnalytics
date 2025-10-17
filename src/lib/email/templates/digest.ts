interface Event {
  id: string
  title: string
  company_name: string
  asx_code: string
  event_type: string
  event_date: string
  importance_score?: number
  project_name?: string
}

interface DigestEmailProps {
  userName?: string
  userEmail: string
  date: Date
  upcomingEvents: Event[]
  watchlistEvents: Event[]
  topRecommendations?: Array<{
    company_name: string
    asx_code: string
    score: number
    reason: string
  }>
  unsubscribeUrl: string
}

export function generateDigestEmail({
  userName,
  userEmail,
  date,
  upcomingEvents,
  watchlistEvents,
  topRecommendations = [],
  unsubscribeUrl,
}: DigestEmailProps) {
  const displayName = userName || userEmail.split('@')[0]
  const dateStr = date.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formatEventType = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const renderEvent = (event: Event) => `
    <tr>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: start; gap: 12px;">
          ${
            event.importance_score
              ? `<div style="min-width: 40px; height: 40px; background-color: ${
                  event.importance_score >= 0.8 ? '#ef4444' : event.importance_score >= 0.6 ? '#f59e0b' : '#10b981'
                }; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">
              ${Math.round(event.importance_score * 100)}
            </div>`
              : ''
          }
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-weight: 600; color: #2563eb; font-size: 14px;">${event.asx_code}</span>
              <span style="color: #6b7280; font-size: 13px;">${event.company_name}</span>
            </div>
            <h3 style="margin: 0 0 4px; font-size: 16px; color: #111827; font-weight: 600;">
              ${event.title}
            </h3>
            <div style="display: flex; gap: 12px; font-size: 13px; color: #6b7280;">
              <span>📅 ${new Date(event.event_date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}</span>
              <span>📊 ${formatEventType(event.event_type)}</span>
              ${event.project_name ? `<span>📍 ${event.project_name}</span>` : ''}
            </div>
          </div>
        </div>
      </td>
    </tr>
  `

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Daily CapSight Digest</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px 40px;">
              <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 24px; font-weight: bold;">
                Your Daily Digest
              </h1>
              <p style="margin: 0; color: #dbeafe; font-size: 14px;">
                ${dateStr}
              </p>
            </td>
          </tr>

          <!-- Summary Stats -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px;">
                    <div style="font-size: 28px; font-weight: bold; color: #2563eb;">${upcomingEvents.length}</div>
                    <div style="font-size: 13px; color: #6b7280;">Upcoming Events</div>
                  </td>
                  <td align="center" style="padding: 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
                    <div style="font-size: 28px; font-weight: bold; color: #2563eb;">${watchlistEvents.length}</div>
                    <div style="font-size: 13px; color: #6b7280;">Watchlist Events</div>
                  </td>
                  <td align="center" style="padding: 8px;">
                    <div style="font-size: 28px; font-weight: bold; color: #2563eb;">${topRecommendations.length}</div>
                    <div style="font-size: 13px; color: #6b7280;">New Recommendations</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Watchlist Events -->
          ${
            watchlistEvents.length > 0
              ? `
          <tr>
            <td style="padding: 24px 40px 12px;">
              <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">
                ⭐ Your Watchlist Events
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                ${watchlistEvents.map(renderEvent).join('')}
              </table>
            </td>
          </tr>
          `
              : ''
          }

          <!-- Upcoming Events -->
          ${
            upcomingEvents.length > 0
              ? `
          <tr>
            <td style="padding: 32px 40px 12px;">
              <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">
                📅 This Week's Key Events
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                ${upcomingEvents.slice(0, 5).map(renderEvent).join('')}
              </table>
            </td>
          </tr>
          `
              : ''
          }

          <!-- Recommendations -->
          ${
            topRecommendations.length > 0
              ? `
          <tr>
            <td style="padding: 32px 40px 12px;">
              <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">
                💡 Top Recommendations
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 24px;">
              ${topRecommendations
                .map(
                  (rec) => `
              <div style="background-color: #f9fafb; border-radius: 6px; padding: 16px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <span style="font-weight: 600; color: #2563eb; font-size: 16px;">${rec.asx_code}</span>
                  <span style="color: #6b7280; font-size: 14px;">${rec.company_name}</span>
                  <span style="margin-left: auto; background-color: #10b981; color: white; padding: 4px 12px; border-radius: 4px; font-size: 13px; font-weight: 600;">
                    ${rec.score}/100
                  </span>
                </div>
                <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 20px;">
                  ${rec.reason}
                </p>
              </div>
              `
                )
                .join('')}
            </td>
          </tr>
          `
              : ''
          }

          <!-- CTA -->
          <tr>
            <td style="padding: 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/calendar" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 15px;">
                      View Full Calendar
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px; color: #6b7280; font-size: 13px; text-align: center;">
                You're receiving this because you opted in to daily digests.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                <a href="${unsubscribeUrl}" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> |
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings" style="color: #6b7280; text-decoration: underline;">Manage Preferences</a>
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

  // Plain text version
  const text = `
Your Daily CapSight Digest - ${dateStr}

Summary:
- ${upcomingEvents.length} Upcoming Events
- ${watchlistEvents.length} Watchlist Events
- ${topRecommendations.length} New Recommendations

${
  watchlistEvents.length > 0
    ? `
⭐ YOUR WATCHLIST EVENTS
${watchlistEvents
  .map(
    (e) =>
      `${e.asx_code} - ${e.title}\n   ${formatEventType(e.event_type)} | ${new Date(e.event_date).toLocaleDateString('en-AU')}`
  )
  .join('\n\n')}
`
    : ''
}

${
  upcomingEvents.length > 0
    ? `
📅 THIS WEEK'S KEY EVENTS
${upcomingEvents
  .slice(0, 5)
  .map(
    (e) =>
      `${e.asx_code} - ${e.title}\n   ${formatEventType(e.event_type)} | ${new Date(e.event_date).toLocaleDateString('en-AU')}`
  )
  .join('\n\n')}
`
    : ''
}

View full calendar: ${process.env.NEXT_PUBLIC_APP_URL}/calendar

Unsubscribe: ${unsubscribeUrl}
Manage preferences: ${process.env.NEXT_PUBLIC_APP_URL}/settings
  `

  return {
    subject: `Your Daily CapSight Digest - ${upcomingEvents.length + watchlistEvents.length} events this week`,
    html,
    text,
  }
}
