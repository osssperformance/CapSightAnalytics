import { sendEmail } from '@/lib/email/mailgun'
import { generateWelcomeEmail } from '@/lib/email/templates/welcome'
import { generateDigestEmail } from '@/lib/email/templates/digest'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { type, email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    if (type === 'welcome') {
      const emailContent = generateWelcomeEmail({
        userEmail: email,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      })

      const result = await sendEmail({
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        tags: ['test', 'welcome'],
      })

      return NextResponse.json(result)
    }

    if (type === 'digest') {
      const emailContent = generateDigestEmail({
        userEmail: email,
        date: new Date(),
        upcomingEvents: [
          {
            id: '1',
            title: 'Pilgangoora Quarterly Production Update - Q1 2025',
            company_name: 'Pilbara Minerals Limited',
            asx_code: 'PLS',
            event_type: 'quarterly_report',
            event_date: '2025-01-31',
            importance_score: 0.85,
            project_name: 'Pilgangoora Project',
          },
          {
            id: '2',
            title: 'Gonneville PFS Results Release',
            company_name: 'Chalice Mining Limited',
            asx_code: 'CHN',
            event_type: 'feasibility_study',
            event_date: '2025-03-05',
            importance_score: 0.95,
            project_name: 'Gonneville Project',
          },
        ],
        watchlistEvents: [
          {
            id: '3',
            title: 'Kathleen Valley First Spodumene Production',
            company_name: 'Liontown Resources Limited',
            asx_code: 'LTR',
            event_type: 'production_update',
            event_date: '2025-01-20',
            importance_score: 0.98,
            project_name: 'Kathleen Valley',
          },
        ],
        topRecommendations: [
          {
            company_name: 'Liontown Resources',
            asx_code: 'LTR',
            score: 87.5,
            reason: 'High-quality lithium asset with near-term production. First spodumene production expected Q1 2025.',
          },
        ],
        unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings?action=unsubscribe`,
      })

      const result = await sendEmail({
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        tags: ['test', 'digest'],
      })

      return NextResponse.json(result)
    }

    return NextResponse.json({ error: 'Invalid type. Use "welcome" or "digest"' }, { status: 400 })
  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 })
  }
}
