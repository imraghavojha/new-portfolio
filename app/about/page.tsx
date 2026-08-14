import { AboutPage } from "../components/PortfolioClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Raghav Ojha",
  description: "About Raghav Ojha: software engineer, AI builder, and computer science student.",
  openGraph: {
    title: "About — Raghav Ojha",
    description: "About Raghav Ojha: software engineer, AI builder, and computer science student.",
    images: [],
  },
  twitter: {
    title: "About — Raghav Ojha",
    description: "About Raghav Ojha: software engineer, AI builder, and computer science student.",
    images: [],
  },
};

export default function About() {
  return <AboutPage />;
}
