import Head from "next/head";
import Link from "next/link";
import { GradientText } from "@/shared/ui";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Head>
        <title>Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">
          <GradientText>404</GradientText>
        </h1>
        <p className="mb-8 text-2xl text-muted-foreground">
          Oops! Page not found
        </p>
        <Link href="/" className="text-primary underline hover:text-primary/80">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
