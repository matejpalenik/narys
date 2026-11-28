'use client';

import { createAuthClient } from 'better-auth/react';
import { useState } from 'react';

const authClient = createAuthClient();

/** Starts GitHub OAuth and shows the current starter session. */
export function GitHubSignIn() {
  const { data, isPending, error: sessionError } = authClient.useSession();
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const signedIn = Boolean(data?.session);

  async function submit(): Promise<void> {
    setSubmitting(true);
    setError(undefined);

    try {
      const result = signedIn
        ? await authClient.signOut()
        : await authClient.signIn.social({ provider: 'github', callbackURL: '/' });
      if (result.error) {
        setError('GitHub authentication could not be completed. Try again.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        disabled={isPending || submitting}
        className="min-h-12 bg-[#0f62fe] px-4 text-white hover:bg-[#0043ce] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f62fe] disabled:opacity-60"
        onClick={() => {
          submit().catch(() =>
            setError('GitHub authentication could not be completed. Try again.'),
          );
        }}
      >
        {signedIn ? 'Sign out' : 'Sign in with GitHub'}
      </button>
      {error || sessionError ? (
        <p role="alert" className="mt-4 text-sm text-[#a2191f]">
          {error ?? 'Your session could not be checked. Try again.'}
        </p>
      ) : null}
    </>
  );
}
