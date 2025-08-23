import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GradientText, Button, GlassCard } from '@/ui';
import { useTheme } from '@/ui/theme-context';

/* eslint-disable jsx-a11y/anchor-is-valid */

const NotFound = () => {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }
  return (
    <div
      className={
        `relative flex min-h-screen items-center justify-center bg-gradient-to-br ` +
        (isDark
          ? 'from-background via-background/80 to-primary/10'
          : 'from-white via-gray-100 to-primary/10')
      }
    >
      <Head>
        <title>Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <GlassCard className="flex w-full max-w-md flex-col items-center gap-6 bg-white/80 p-10 shadow-2xl dark:bg-background/80">
        <Image
          src="/robot.png"
          alt="Lost robot"
          width={80}
          height={80}
          className="mb-2 drop-shadow-lg"
          priority
        />
        <h1 className="mb-2 text-4xl font-extrabold sm:text-5xl md:text-6xl">
          <GradientText>Lost?</GradientText>
        </h1>
        <p className="mb-4 text-center text-lg text-gray-700 dark:text-muted-foreground">
          Oops! The page you’re looking for doesn’t exist. Maybe you took a wrong turn?
        </p>
        <Link href="/" passHref legacyBehavior>
          <Button asChild variant="default" className="w-full">
            <a>Return to Home</a>
          </Button>
        </Link>
      </GlassCard>
      {/* Subtle glow effect */}
      <div className="pointer-events-none absolute inset-0 z-[-1] flex items-center justify-center">
        <div className="size-80 rounded-full bg-primary/10 opacity-60 blur-3xl dark:bg-primary/20" />
      </div>
    </div>
  );
};

export default NotFound;
