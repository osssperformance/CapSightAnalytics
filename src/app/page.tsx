export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4 text-center">
          CapSight Analytics
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          ASX Commodities Event Calendar
        </p>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">🚀 Phase 1, Day 1: Complete!</h2>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Next.js 15 initialized</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>TypeScript configured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Tailwind CSS setup</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Calendar dependencies installed (@internationalized/date, react-aria, framer-motion)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Project structure created</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Environment variables configured</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Next Steps:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Configure Supabase project</li>
              <li>Set up Vercel deployment</li>
              <li>Start building custom calendar component</li>
              <li>Create database schema</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
