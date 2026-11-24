import type { Metadata } from "next";
import { getLang } from "@/i18n/server";
import { pageMeta } from "@/i18n/meta";
import { WorkView } from "@/components/sections/WorkView";

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta.work[await getLang()];
}

export default function WorkPage() {
  return <WorkView />;
}
