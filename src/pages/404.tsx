import Head from "next/head";
import Link from "next/link";
import { GradientText } from "@/shared/ui";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Head>
        <title>Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          <GradientText>404</GradientText>
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          Oops! Page not found
        </p>
        <Link href="/">
          <a className="text-primary hover:text-primary/80 underline">
            Return to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
