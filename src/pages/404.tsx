import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <Head>
        <title>Page not found | Martin Nolan</title>
        <meta name="robots" content="noindex" />
      </Head>
      <p className="eyebrow">404</p>
      <h1>This page does not exist.</h1>
      <p>The portfolio is a single page. Return home to continue.</p>
      <Link href="/">Return home</Link>
    </main>
  );
}
