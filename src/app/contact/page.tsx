import type { Metadata } from "next";
import { getLang } from "@/i18n/server";
import { pageMeta } from "@/i18n/meta";
import { ContactView } from "@/components/sections/ContactView";

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta.contact[await getLang()];
}

export default function ContactPage() {
  return <ContactView />;
}
