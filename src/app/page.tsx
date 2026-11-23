import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { Solution } from "@/components/home/Solution";
import { BuildCategories } from "@/components/home/BuildCategories";
import { Journey } from "@/components/home/Journey";
import { TwoSides } from "@/components/home/TwoSides";
import { Different } from "@/components/home/Different";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <BuildCategories />
      <Journey />
      <TwoSides />
      <Different />
      <FinalCta />
    </>
  );
}
