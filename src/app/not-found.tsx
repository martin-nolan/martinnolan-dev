import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <p className="kicker">404</p>
      <h1>Nothing here.</h1>
      <p>
        That page doesn&rsquo;t exist. <Link href="/">Back to the start</Link>.
      </p>
    </main>
  );
}
