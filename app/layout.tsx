import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raghav Ojha — Software Engineer",
  description: "AI systems, developer tools, and selected work by Raghav Ojha.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
