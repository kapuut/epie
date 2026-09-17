import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Epie — A Little Book of How It All Began",
  description: "A vintage interactive storybook made with love for Epie.",
  openGraph: {
    title: "For Epie — A Little Book of How It All Began",
    description: "A vintage interactive storybook made with love for Epie.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased selection:bg-warm-accent/20" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
