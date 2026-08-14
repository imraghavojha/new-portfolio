import type { Metadata } from "next";
import { AboutPage } from "./components/PortfolioClient";

export const metadata: Metadata = {
  title: "About — Raghav Ojha",
  description: "About Raghav Ojha: software engineer, AI builder, and computer science student.",
};

export default function Home() {
  return <AboutPage />;
}
