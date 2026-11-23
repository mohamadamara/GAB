import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/about", "/services", "/how-it-works", "/builders", "/platform", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
