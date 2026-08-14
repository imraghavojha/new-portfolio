import type { Metadata } from "next";
import { WorkPage } from "../components/PortfolioClient";

export const metadata: Metadata = {
  title: "Projects — Raghav Ojha",
  description: "AI systems, developer tools, and selected work by Raghav Ojha.",
};

export default function Projects() {
  return <WorkPage />;
}
