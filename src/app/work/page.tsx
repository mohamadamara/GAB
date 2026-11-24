import type { Metadata } from "next";
import { WorkView } from "@/components/sections/WorkView";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Concept previews of the planned GAB platform: customer dashboard, project creation, builder discovery, profiles, proposal comparison, builder dashboard and administration.",
};

export default function WorkPage() {
  return <WorkView />;
}
