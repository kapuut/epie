import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello Epie",
  description: "Can you please open this?.",
  openGraph: {
    title: "Hello Epie",
    description: "Can you please open this?.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Epie",
    description: "Can you please open this?.",
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
