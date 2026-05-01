import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@/ui/button';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--paper-strong)] px-4 py-12">
      <Head>
        <title>Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="w-full max-w-xl rounded-[2rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-10 text-center shadow-[0_24px_70px_rgba(78,65,52,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold -tracking-wider text-[color:var(--ink-strong)] sm:text-5xl">
          This page does not exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[color:var(--ink-muted)]">
          Try the homepage or use the footer links for GitHub, LinkedIn, and email.
        </p>
        <div className="mt-8">
          <Link href="/" className="inline-flex">
            <Button className="rounded-full bg-[color:var(--ink-strong)] px-5 text-[color:var(--paper)] hover:bg-[color:var(--ink-strong)]">
              Return to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
