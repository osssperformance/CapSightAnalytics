import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()

  try {
    // Update Pilbara Minerals events
    await supabase.from('events').update({ event_date: '2025-10-31' })
      .eq('company_id', (await supabase.from('companies').select('id').eq('asx_code', 'PLS').single()).data?.id)
      .eq('event_type', 'quarterly_report')

    await supabase.from('events').update({ event_date: '2025-11-15' })
      .eq('company_id', (await supabase.from('companies').select('id').eq('asx_code', 'PLS').single()).data?.id)
      .eq('event_type', 'production_update')

    // Update Lynas events
    await supabase.from('events').update({ event_date: '2025-10-25' })
      .eq('company_id', (await supabase.from('companies').select('id').eq('asx_code', 'LYC').single()).data?.id)
      .eq('event_type', 'drilling_results')

    await supabase.from('events').update({ event_date: '2025-11-20' })
      .eq('company_id', (await supabase.from('companies').select('id').eq('asx_code', 'LYC').single()).data?.id)
      .eq('event_type', 'production_update')

    // Update IGO events
    const igoId = (await supabase.from('companies').select('id').eq('asx_code', 'IGO').single()).data?.id
    await supabase.from('events').update({ event_date: '2025-10-28' })
      .eq('company_id', igoId)
      .eq('event_type', 'production_update')

    await supabase.from('events').update({ event_date: '2025-12-10' })
      .eq('company_id', igoId)
      .eq('event_type', 'feasibility_study')

    // Update Core Lithium events
    const cxoId = (await supabase.from('companies').select('id').eq('asx_code', 'CXO').single()).data?.id
    await supabase.from('events').update({ event_date: '2025-11-12' })
      .eq('company_id', cxoId)
      .eq('event_type', 'jorc_resource')

    await supabase.from('events').update({ event_date: '2025-12-15' })
      .eq('company_id', cxoId)
      .eq('event_type', 'agm_egm')

    // Update Syrah events
    await supabase.from('events').update({ event_date: '2025-11-18' })
      .eq('company_id', (await supabase.from('companies').select('id').eq('asx_code', 'SYR').single()).data?.id)
      .eq('event_type', 'production_update')

    // Update Chalice events
    const chnId = (await supabase.from('companies').select('id').eq('asx_code', 'CHN').single()).data?.id
    await supabase.from('events').update({ event_date: '2025-12-05' })
      .eq('company_id', chnId)
      .eq('event_type', 'feasibility_study')

    await supabase.from('events').update({ event_date: '2025-11-08' })
      .eq('company_id', chnId)
      .eq('event_type', 'assay_results')

    // Update Liontown events
    const ltrId = (await supabase.from('companies').select('id').eq('asx_code', 'LTR').single()).data?.id
    await supabase.from('events').update({ event_date: '2025-10-20' })
      .eq('company_id', ltrId)
      .eq('event_type', 'production_update')

    await supabase.from('events').update({ event_date: '2025-12-01' })
      .eq('company_id', ltrId)
      .eq('event_type', 'permits_approvals')

    // Update Australian Vanadium events
    await supabase.from('events').update({ event_date: '2025-11-25' })
      .eq('company_id', (await supabase.from('companies').select('id').eq('asx_code', 'AVL').single()).data?.id)
      .eq('event_type', 'capital_raise')

    // Update Arafura events
    const aruId = (await supabase.from('companies').select('id').eq('asx_code', 'ARU').single()).data?.id
    await supabase.from('events').update({ event_date: '2025-11-01' })
      .eq('company_id', aruId)
      .ilike('title', '%Construction%')

    await supabase.from('events').update({ event_date: '2025-10-25' })
      .eq('company_id', aruId)
      .ilike('title', '%Funding%')

    // Update Jervois events
    await supabase.from('events').update({ event_date: '2025-11-10' })
      .eq('company_id', (await supabase.from('companies').select('id').eq('asx_code', 'JRV').single()).data?.id)
      .eq('event_type', 'production_update')

    return NextResponse.json({ success: true, message: 'Event dates updated to October-December 2025' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
