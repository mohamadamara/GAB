import type { Metadata } from "next";
import { ServicesView } from "@/components/sections/ServicesView";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The software GAB is being built to help you find builders for: websites, mobile apps, SaaS, CRM, ERP, booking systems, dashboards, automation, e-commerce, AI and custom software.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
