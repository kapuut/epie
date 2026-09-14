import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little Story About Us",
  description: "An interactive love letter — a story of how two people found each other.",
  openGraph: {
    title: "A Little Story About Us",
    description: "An interactive love letter — a story of how two people found each other.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-cream text-ink antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
