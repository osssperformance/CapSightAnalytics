import formData from 'form-data'
import Mailgun from 'mailgun.js'

const mailgun = new Mailgun(formData)

export const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
  url: 'https://api.mailgun.net', // Use EU endpoint if needed: https://api.eu.mailgun.net
})

export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
  tags?: string[]
}

export async function sendEmail(options: EmailOptions) {
  const {
    to,
    subject,
    html,
    text,
    from = `CapSight Analytics <noreply@${MAILGUN_DOMAIN}>`,
    replyTo,
    tags = [],
  } = options

  try {
    const result = await mg.messages.create(MAILGUN_DOMAIN, {
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text: text || stripHtml(html),
      'h:Reply-To': replyTo,
      'o:tag': tags,
      'o:tracking': 'yes',
      'o:tracking-clicks': 'yes',
      'o:tracking-opens': 'yes',
    })

    return { success: true, messageId: result.id }
  } catch (error) {
    console.error('Mailgun error:', error)
    return { success: false, error }
  }
}

// Simple HTML tag stripper for plain text fallback
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
