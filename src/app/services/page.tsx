import type { Metadata } from "next";
import { getLang } from "@/i18n/server";
import { pageMeta } from "@/i18n/meta";
import { ServicesView } from "@/components/sections/ServicesView";

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta.services[await getLang()];
}

export default function ServicesPage() {
  return <ServicesView />;
}
