import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";

const routes = ["", "/services", "/projects", "/how-it-works", "/about", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...projects.map((p) => `/projects/${p.slug}`)].map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
