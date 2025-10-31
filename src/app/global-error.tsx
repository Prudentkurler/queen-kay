'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Something went wrong!
            </h2>
            <p className="mb-4 text-gray-600">
              An error occurred and has been reported to our team. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
