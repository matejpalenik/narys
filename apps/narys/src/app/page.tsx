import { GitHubSignIn } from '@/feature/architecture/ui/github-sign-in';

/** Shows the GitHub authentication entry point for the starter. */
export default function HomePage() {
  return (
    <main className="mx-auto mt-20 max-w-lg border border-[#c6c6c6] bg-white p-8">
      <h1 className="mb-6 text-3xl font-semibold">Narys</h1>
      <GitHubSignIn />
    </main>
  );
}
