import type { Metadata } from "next";
import { ContactView } from "@/components/sections/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with GAB about general inquiries, business partnerships, developer interest or collaboration opportunities.",
};

export default function ContactPage() {
  return <ContactView />;
}
