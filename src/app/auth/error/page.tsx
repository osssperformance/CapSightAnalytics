import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-lg bg-white px-8 py-8 shadow">
          <div className="rounded-md bg-red-50 p-4">
            <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>There was a problem signing you in. This could be because:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>The magic link has expired</li>
                <li>The link has already been used</li>
                <li>The link is invalid</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/login"
              className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              Try again
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
