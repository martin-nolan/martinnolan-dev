import Head from "next/head";
import Link from "next/link";
import { GradientText } from "@/shared/ui";
import { GlassCard } from "@/shared/ui/glass-card";
import Image from "next/image";

import { Button } from "@/shared/ui/button";
import { useTheme } from "@/shared/ui/theme-context";
import { useEffect, useState } from "react";

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
          ? "from-background via-background/80 to-primary/10"
          : "from-white via-gray-100 to-primary/10")
      }
    >
      <Head>
        <title>Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <GlassCard className="p-10 flex flex-col items-center gap-6 shadow-2xl max-w-md w-full bg-white/80 dark:bg-background/80">
        <Image
          src="/robot.png"
          alt="Lost robot"
          width={80}
          height={80}
          className="mb-2 drop-shadow-lg"
          priority
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2">
          <GradientText>Lost?</GradientText>
        </h1>
        <p className="text-lg mb-4 text-center text-gray-700 dark:text-muted-foreground">
          Oops! The page you’re looking for doesn’t exist. Maybe you took a
          wrong turn?
        </p>
        <Link href="/" passHref legacyBehavior>
          <Button asChild variant="default" className="w-full">
            <a>Return to Home</a>
          </Button>
        </Link>
      </GlassCard>
      {/* Subtle glow effect */}
      <div className="pointer-events-none absolute inset-0 z-[-1] flex items-center justify-center">
        <div className="h-80 w-80 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl opacity-60" />
      </div>
    </div>
  );
};

export default NotFound;
