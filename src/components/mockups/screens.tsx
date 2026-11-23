/**
 * Planned GAB interfaces — conceptual previews with fictional demonstration data.
 * Nothing here is a live product; see /src/data/demo.ts.
 */
import { demoBuilders, demoProject, demoProposals, type DemoBuilder } from "@/data/demo";
import { ServiceVisual } from "../sections/ServiceVisual";
import { AppFrame } from "./AppFrame";
import {
  MAvatar,
  MBadge,
  MButton,
  MCard,
  MCheck,
  MChip,
  MCopperButton,
  MField,
  MIcon,
  MProgress,
  MStat,
  icons,
} from "./primitives";

const byId = (id: string) => demoBuilders.find((b) => b.id === id)!;

function PageTitle({ eyebrow, title, actions }: { eyebrow?: string; title: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent-600">{eyebrow}</p>}
        <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-ink-900">{title}</h3>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

/* 1 ─ Customer dashboard */
export function CustomerDashboardScreen() {
  return (
    <AppFrame role="customer" active="Overview" path="app.gab/overview">
      <PageTitle
        eyebrow="Good morning"
        title="Your projects at a glance"
        actions={
          <MCopperButton>
            <MIcon d={icons.plus} /> New project
          </MCopperButton>
        }
      />
      <div className="grid grid-cols-4 gap-3">
        <MStat label="Active projects" value="2" hint="1 awaiting your review" />
        <MStat label="Proposals received" value="3" hint="For clinic booking" />
        <MStat label="Saved builders" value="5" hint="Across 2 categories" />
        <MStat label="Scope clarity" value="86%" hint="Booking project" />
      </div>
      <div className="mt-4 grid grid-cols-[1.5fr_1fr] gap-3">
        <MCard title="My projects" action={<MButton variant="ghost">View all</MButton>}>
          {[
            { n: demoProject.name, c: "Booking system", s: "Comparing proposals", p: 72, tone: "copper" as const },
            { n: "Sales dashboard", c: "Business dashboard", s: "Defining scope", p: 35, tone: "neutral" as const },
            { n: "Website refresh", c: "Website", s: "Draft", p: 10, tone: "outline" as const },
          ].map((r) => (
            <div key={r.n} className="grid grid-cols-[1.5fr_1fr_1fr] items-center gap-4 border-b border-stone-100 px-4 py-3.5 last:border-0">
              <div>
                <p className="text-[13px] font-medium">{r.n}</p>
                <p className="text-[11.5px] text-stone-400">{r.c}</p>
              </div>
              <MBadge tone={r.tone}>{r.s}</MBadge>
              <div className="flex items-center gap-2">
                <MProgress value={r.p} className="flex-1" />
                <span className="w-8 text-right text-[11px] text-ink-500">{r.p}%</span>
              </div>
            </div>
          ))}
        </MCard>
        <MCard title="Next steps">
          <div className="space-y-3 p-4">
            {[
              ["Review 3 proposals", "Clinic appointment booking", true],
              ["Answer 2 builder questions", "About SMS provider", true],
              ["Add example websites", "Sales dashboard", false],
            ].map(([t, s, hot]) => (
              <div key={t as string} className="flex gap-3">
                <span className={"mt-1 size-2 shrink-0 rounded-full " + (hot ? "bg-accent-500" : "bg-stone-300")} />
                <div>
                  <p className="text-[12.5px] font-medium">{t as string}</p>
                  <p className="text-[11px] text-stone-400">{s as string}</p>
                </div>
              </div>
            ))}
          </div>
        </MCard>
      </div>
      <div className="mt-3 flex items-center gap-4 rounded-[6px] bg-ink-900 p-4 text-paper">
        <span className="grid size-9 place-items-center rounded-[4px] bg-accent-500 text-[#080808]">
          <MIcon d={icons.spark} />
        </span>
        <div>
          <p className="text-[13px] font-medium">Recommended builders are ready for “Sales dashboard”</p>
          <p className="text-[11.5px] text-paper/70">Based on your scope: data connectors, KPI views, role-based access.</p>
        </div>
        <span className="ml-auto inline-flex h-8 items-center rounded-[4px] bg-paper px-3 text-[12px] font-medium text-ink-900">Explore</span>
      </div>
    </AppFrame>
  );
}

/* 2 ─ Project creation */
export function ProjectCreateScreen() {
  return (
    <AppFrame role="customer" active="My projects" path="app.gab/projects/new">
      <PageTitle eyebrow="New project · Step 1 of 4" title="Describe what you need" />
      <div className="mb-5 grid grid-cols-4 gap-2">
        {["Describe", "Category", "Details", "Review"].map((s, i) => (
          <div key={s}>
            <span className={"block h-1 rounded-full " + (i === 0 ? "bg-accent-500" : "bg-stone-200")} />
            <p className={"mt-2 text-[11.5px] " + (i === 0 ? "font-medium text-ink-900" : "text-stone-400")}>
              0{i + 1} {s}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.6fr_1fr] gap-4">
        <MCard className="space-y-4 p-5">
          <MField label="Project name" value={demoProject.name} />
          <MField label="In your own words, what problem are you trying to solve?" value={demoProject.description} tall />
          <div>
            <p className="mb-2 text-[11px] font-medium text-ink-600">What would success look like?</p>
            <div className="flex flex-wrap gap-2">
              {demoProject.goals.map((g) => (
                <MChip key={g} active>
                  {g}
                </MChip>
              ))}
              <MChip>+ Add goal</MChip>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MField label="Ideal timeline" value={demoProject.timeline} />
            <MField label="Budget" value={demoProject.budget} />
          </div>
          <div className="flex items-center justify-between border-t border-stone-100 pt-4">
            <MButton variant="ghost">Save draft</MButton>
            <MButton>Continue →</MButton>
          </div>
        </MCard>
        <div className="space-y-3">
          <MCard className="p-4">
            <p className="text-[12.5px] font-semibold">Writing tips</p>
            <ul className="mt-3 space-y-2.5 text-[12px] text-ink-600">
              <li>• Describe the problem, not the technology.</li>
              <li>• Mention who will use the software.</li>
              <li>• Share examples you like — or dislike.</li>
            </ul>
          </MCard>
          <MCard className="p-4">
            <p className="text-[12.5px] font-semibold">Attachments</p>
            <div className="mt-3 grid h-24 place-items-center rounded-[4px] border border-dashed border-stone-300 text-[12px] text-stone-400">
              Drop sketches, documents or screenshots
            </div>
          </MCard>
          <div className="rounded-[6px] border border-accent-500/30 bg-accent-500/5 p-4">
            <p className="text-[12px] text-accent-700">Suggested category</p>
            <p className="mt-1 text-[13px] font-semibold">Booking & appointment system</p>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* 3 ─ Project requirements */
export function RequirementsScreen() {
  const col = (title: string, items: readonly string[], tone: "dark" | "copper" | "neutral") => (
    <MCard className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-semibold">{title}</p>
        <MBadge tone={tone}>{items.length}</MBadge>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="rounded-[4px] border border-stone-100 bg-[#141416] px-3 py-2 text-[12px]">
            {i}
          </li>
        ))}
      </ul>
    </MCard>
  );
  return (
    <AppFrame role="customer" active="My projects" path="app.gab/projects/clinic-booking/scope">
      <PageTitle
        eyebrow="Project scope"
        title={demoProject.name}
        actions={
          <>
            <MButton variant="secondary">Export brief</MButton>
            <MButton>Share with builders</MButton>
          </>
        }
      />
      <div className="grid grid-cols-[1fr_260px] gap-4">
        <div className="space-y-3">
          <MCard className="grid grid-cols-3 gap-4 p-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-stone-400">Goals</p>
              <ul className="mt-2 space-y-1 text-[12.5px]">
                {demoProject.goals.map((g) => (
                  <li key={g}>— {g}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-stone-400">Users</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {demoProject.users.map((u) => (
                  <MBadge key={u}>{u}</MBadge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-stone-400">Integrations</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {demoProject.integrations.map((u) => (
                  <MBadge key={u} tone="outline">
                    {u}
                  </MBadge>
                ))}
              </div>
            </div>
          </MCard>
          <div className="grid grid-cols-3 gap-3">
            {col("Must have", demoProject.must, "dark")}
            {col("Should have", demoProject.should, "copper")}
            {col("Could have", demoProject.could, "neutral")}
          </div>
        </div>
        <div className="space-y-3">
          <MCard className="p-4">
            <p className="text-[12.5px] font-semibold">Scope clarity</p>
            <p className="mt-2 text-[30px] font-semibold tracking-[-0.04em]">86%</p>
            <MProgress value={86} className="mt-2" />
            <div className="mt-4 space-y-2">
              <MCheck checked label="Goals defined" />
              <MCheck checked label="Users identified" />
              <MCheck checked label="Priorities set" />
              <MCheck label="Example references added" />
            </div>
          </MCard>
          <MCard className="p-4">
            <p className="text-[12.5px] font-semibold">Platforms</p>
            <div className="mt-2 flex gap-1.5">
              {demoProject.platforms.map((p) => (
                <MBadge key={p} tone="copper">
                  {p}
                </MBadge>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] font-semibold">Timeline</p>
            <p className="mt-1 text-[12px] text-ink-600">{demoProject.timeline}</p>
          </MCard>
        </div>
      </div>
    </AppFrame>
  );
}

function BuilderCard({ b, compact }: { b: DemoBuilder; compact?: boolean }) {
  return (
    <MCard className="p-4">
      <div className="flex items-start gap-3">
        <MAvatar initials={b.initials} size={40} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[13.5px] font-semibold">{b.name}</p>
            <MBadge tone="outline">Sample</MBadge>
          </div>
          <p className="text-[11.5px] text-stone-400">
            {b.kind} · {b.teamSize}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[16px] font-semibold text-accent-600">{b.relevance}%</p>
          <p className="text-[10px] uppercase tracking-[0.08em] text-stone-400">Relevance</p>
        </div>
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-ink-600">{b.headline}</p>
      {!compact && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {b.tech.slice(0, 4).map((t) => (
            <MBadge key={t}>{t}</MBadge>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
        <span className="text-[11px] text-ink-500">{b.availability}</span>
        <MButton variant="secondary">View profile</MButton>
      </div>
    </MCard>
  );
}

/* 4 ─ Builder discovery */
export function DiscoveryScreen() {
  return (
    <AppFrame role="customer" active="Discover builders" path="app.gab/discover?project=clinic-booking">
      <PageTitle eyebrow="For: Clinic appointment booking" title="Discover builders" actions={<MButton variant="secondary">Sort: Relevance</MButton>} />
      <div className="grid grid-cols-[200px_1fr] gap-4">
        <MCard className="space-y-5 p-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">Builder type</p>
            <div className="mt-2.5 space-y-2">
              <MCheck checked label="Independent developer" />
              <MCheck checked label="Development studio" />
              <MCheck checked label="Technical team" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">Skills</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <MChip active>Booking</MChip>
              <MChip active>Calendar APIs</MChip>
              <MChip>Payments</MChip>
              <MChip>SMS</MChip>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">Availability</p>
            <div className="mt-2.5 space-y-2">
              <MCheck checked label="Within 1 month" />
              <MCheck label="Within 3 months" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">Working style</p>
            <div className="mt-2.5 space-y-2">
              <MCheck checked label="Remote" />
              <MCheck label="On-site possible" />
            </div>
          </div>
        </MCard>
        <div>
          <div className="mb-3 flex items-center gap-2 text-[12px] text-ink-500">
            <MBadge tone="copper">Matched to your scope</MBadge>4 sample builders shown
          </div>
          <div className="grid grid-cols-2 gap-3">
            {demoBuilders.map((b) => (
              <BuilderCard key={b.id} b={b} />
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* 5 ─ Builder profile */
export function BuilderProfileScreen({ id = "atlas-oak" }: { id?: string }) {
  const b = byId(id);
  return (
    <AppFrame role="customer" active="Discover builders" path={`app.gab/builders/${b.id}`}>
      <MCard className="overflow-hidden">
        <div className="relative h-24 bg-ink-900">
          <div className="bg-grid absolute inset-0 opacity-70" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,rgb(240_138_108/0.35),transparent_70%)]" />
        </div>
        <div className="flex items-end gap-4 px-5 pb-5">
          <div className="-mt-9 rounded-full border-4 border-white">
            <MAvatar initials={b.initials} size={72} />
          </div>
          <div className="flex-1 pt-3">
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-semibold tracking-[-0.03em]">{b.name}</h3>
              <MBadge tone="outline">Sample profile · fictional</MBadge>
            </div>
            <p className="text-[12.5px] text-ink-600">
              {b.kind} · {b.location} · {b.teamSize}
            </p>
          </div>
          <div className="flex gap-2">
            <MButton variant="secondary">Save</MButton>
            <MCopperButton>Invite to project</MCopperButton>
          </div>
        </div>
      </MCard>
      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
        <div className="space-y-3">
          <MCard title="About">
            <p className="p-4 text-[12.5px] leading-relaxed text-ink-700">
              {b.headline} We work in short, visible phases, starting every engagement with a discovery session to agree
              goals, priorities and success measures before any code is written.
            </p>
          </MCard>
          <MCard title="Selected work" action={<MButton variant="ghost">Portfolio →</MButton>}>
            <div className="grid grid-cols-3 gap-3 p-4">
              {b.portfolio.map((p) => (
                <div key={p.title}>
                  <div className="rounded-[4px] bg-ink-900 p-2">
                    <ServiceVisual kind={p.visual} />
                  </div>
                  <p className="mt-2 text-[12px] font-medium">{p.title}</p>
                  <p className="text-[11px] text-stone-400">{p.category}</p>
                </div>
              ))}
            </div>
          </MCard>
        </div>
        <div className="space-y-3">
          <MCard title="Skills">
            <div className="flex flex-wrap gap-1.5 p-4">
              {b.skills.map((s) => (
                <MBadge key={s} tone="copper">
                  {s}
                </MBadge>
              ))}
            </div>
          </MCard>
          <MCard title="Technologies">
            <div className="flex flex-wrap gap-1.5 p-4">
              {b.tech.map((s) => (
                <MBadge key={s}>{s}</MBadge>
              ))}
            </div>
          </MCard>
          <MCard title="Services">
            <ul className="space-y-2 p-4 text-[12.5px]">
              {b.services.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <MIcon d={icons.check} className="size-3.5 text-accent-600" />
                  {s}
                </li>
              ))}
            </ul>
          </MCard>
          <MCard className="flex items-center justify-between p-4">
            <span className="text-[12px] text-ink-600">Availability</span>
            <MBadge tone="green">{b.availability}</MBadge>
          </MCard>
        </div>
      </div>
    </AppFrame>
  );
}

/* 6 ─ Portfolio showcase */
export function PortfolioScreen() {
  const b = byId("atlas-oak");
  const f = b.portfolio[0];
  return (
    <AppFrame role="customer" active="Discover builders" path={`app.gab/builders/${b.id}/portfolio`}>
      <PageTitle eyebrow={`${b.name} · Portfolio (sample)`} title={f.title} actions={<MBadge tone="copper">{f.category}</MBadge>} />
      <div className="grid grid-cols-[1.6fr_1fr] gap-4">
        <div className="space-y-3">
          <div className="rounded-[6px] bg-ink-900 p-6">
            <ServiceVisual kind={f.visual} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(["booking", "dashboard", "mobile"] as const).map((k) => (
              <div key={k} className="rounded-[4px] border border-stone-200 bg-white p-2">
                <ServiceVisual kind={k} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <MCard title="The challenge">
            <p className="p-4 text-[12.5px] leading-relaxed text-ink-700">{f.summary}</p>
          </MCard>
          <MCard title="What was built">
            <ul className="space-y-2 p-4 text-[12.5px]">
              {["Public booking page", "Practitioner calendars", "Reminder automation", "Reception admin"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <MIcon d={icons.check} className="size-3.5 text-accent-600" />
                  {s}
                </li>
              ))}
            </ul>
          </MCard>
          <MCard title="Stack">
            <div className="flex flex-wrap gap-1.5 p-4">
              {b.tech.slice(0, 5).map((t) => (
                <MBadge key={t}>{t}</MBadge>
              ))}
            </div>
          </MCard>
          <MCard className="p-4">
            <p className="text-[11px] uppercase tracking-[0.08em] text-stone-400">Builder role</p>
            <p className="mt-1 text-[12.5px]">Design, development and launch support</p>
          </MCard>
        </div>
      </div>
    </AppFrame>
  );
}

/* 7 ─ Proposal comparison */
export function ProposalComparisonScreen() {
  const rows: { label: string; get: (p: (typeof demoProposals)[number]) => React.ReactNode }[] = [
    { label: "Approach", get: (p) => p.approach },
    { label: "Timeline", get: (p) => <span className="font-semibold">{p.timeline}</span> },
    { label: "Phases", get: (p) => p.phases },
    { label: "Pricing model", get: (p) => p.estimate },
    {
      label: "Includes",
      get: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.includes.map((i) => (
            <MBadge key={i}>{i}</MBadge>
          ))}
        </div>
      ),
    },
    { label: "Open questions", get: (p) => `${p.questions} questions for you` },
  ];
  return (
    <AppFrame role="customer" active="Proposals" path="app.gab/projects/clinic-booking/proposals">
      <PageTitle eyebrow={demoProject.name} title="Compare proposals" actions={<MButton variant="secondary">Hide differences</MButton>} />
      <MCard className="overflow-hidden">
        <div className="grid grid-cols-[150px_repeat(3,1fr)]">
          <div className="border-b border-r border-stone-100 bg-[#141416] p-4 text-[11px] uppercase tracking-[0.08em] text-stone-400">Sample proposals</div>
          {demoProposals.map((p, i) => {
            const b = byId(p.builder);
            return (
              <div key={p.builder} className={"border-b border-stone-100 p-4 " + (i === 0 ? "bg-accent-500/[0.06]" : "")}>
                <div className="flex items-center gap-2.5">
                  <MAvatar initials={b.initials} size={30} tone={i === 0 ? "copper" : "dark"} />
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold">{b.name}</p>
                    <p className="text-[11px] text-stone-400">{b.kind}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {rows.map((r) => (
            <div key={r.label} className="contents">
              <div className="border-b border-r border-stone-100 bg-[#141416] px-4 py-3 text-[12px] font-medium text-ink-600">{r.label}</div>
              {demoProposals.map((p, i) => (
                <div key={p.builder} className={"border-b border-stone-100 px-4 py-3 text-[12px] leading-relaxed " + (i === 0 ? "bg-accent-500/[0.06]" : "")}>
                  {r.get(p)}
                </div>
              ))}
            </div>
          ))}
          <div className="border-r border-stone-100 bg-[#141416]" />
          {demoProposals.map((p, i) => (
            <div key={p.builder} className={"flex gap-2 p-4 " + (i === 0 ? "bg-accent-500/[0.06]" : "")}>
              {i === 0 ? <MCopperButton>Select builder</MCopperButton> : <MButton variant="secondary">Select</MButton>}
              <MButton variant="ghost">Message</MButton>
            </div>
          ))}
        </div>
      </MCard>
    </AppFrame>
  );
}

/* 8 ─ Project selection */
export function SelectionScreen() {
  const b = byId("atlas-oak");
  return (
    <AppFrame role="customer" active="Proposals" path="app.gab/projects/clinic-booking/select">
      <div className="mx-auto max-w-[720px] py-4">
        <div className="text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-500 text-[#080808]">
            <MIcon d={icons.check} className="size-5" />
          </span>
          <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.035em]">Confirm your builder</h3>
          <p className="mt-1 text-[12.5px] text-ink-600">Review the agreed starting point before you continue.</p>
        </div>
        <MCard className="mt-6 p-5">
          <div className="flex items-center gap-3">
            <MAvatar initials={b.initials} size={44} tone="copper" />
            <div>
              <p className="text-[14px] font-semibold">{b.name}</p>
              <p className="text-[11.5px] text-stone-400">Sample builder · {b.kind}</p>
            </div>
            <MBadge tone="copper" className="ml-auto">
              Selected
            </MBadge>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-stone-100 pt-4">
            {[
              ["Project", demoProject.name],
              ["Timeline", "10 weeks · 3 phases"],
              ["First milestone", "Discovery & design"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] uppercase tracking-[0.08em] text-stone-400">{k}</p>
                <p className="mt-1 text-[12.5px] font-medium">{v}</p>
              </div>
            ))}
          </div>
        </MCard>
        <MCard className="mt-3 p-5">
          <p className="text-[12.5px] font-semibold">Before you continue</p>
          <div className="mt-3 space-y-2.5">
            <MCheck checked label="I have reviewed the proposal scope and phases" />
            <MCheck checked label="Open questions have been answered" />
            <MCheck label="Notify the other builders that a decision was made" />
          </div>
        </MCard>
        <div className="mt-5 flex justify-between">
          <MButton variant="secondary">Back to comparison</MButton>
          <MCopperButton>Confirm selection</MCopperButton>
        </div>
      </div>
    </AppFrame>
  );
}

/* 9 ─ Builder dashboard */
export function BuilderDashboardScreen() {
  return (
    <AppFrame role="builder" active="Overview" path="app.gab/builder/overview" user={{ initials: "AO", name: "Atlas & Oak (sample)" }}>
      <PageTitle eyebrow="Builder workspace" title="Opportunities for your skills" actions={<MButton variant="secondary">Edit matching preferences</MButton>} />
      <div className="grid grid-cols-4 gap-3">
        <MStat label="Matching projects" value="7" hint="Booking · Web apps" />
        <MStat label="Proposals sent" value="3" hint="1 shortlisted" />
        <MStat label="Profile views" value="48" hint="Last 30 days" />
        <MStat label="Profile strength" value="92%" hint="Add 1 case study" />
      </div>
      <div className="mt-4 grid grid-cols-[1.6fr_1fr] gap-3">
        <MCard title="Recommended opportunities" action={<MBadge tone="copper">Matched to your profile</MBadge>}>
          {[
            ["Clinic appointment booking", "Booking system · Web + admin", "Within 3 months", 94],
            ["Gym membership app", "Mobile app · iOS & Android", "Within 6 months", 82],
            ["Salon multi-location booking", "Booking system · SaaS", "Flexible", 79],
          ].map(([t, c, w, m]) => (
            <div key={t as string} className="flex items-center gap-4 border-b border-stone-100 px-4 py-3.5 last:border-0">
              <div className="flex-1">
                <p className="text-[13px] font-medium">{t as string}</p>
                <p className="text-[11.5px] text-stone-400">
                  {c as string} · {w as string}
                </p>
              </div>
              <div className="w-24">
                <p className="text-right text-[11px] text-ink-500">{m as number}% fit</p>
                <MProgress value={m as number} className="mt-1" />
              </div>
              <MButton variant="secondary">View brief</MButton>
            </div>
          ))}
        </MCard>
        <div className="space-y-3">
          <MCard title="Proposal pipeline">
            <div className="space-y-3 p-4">
              {[
                ["Drafting", 1],
                ["Submitted", 2],
                ["Shortlisted", 1],
              ].map(([k, v]) => (
                <div key={k as string} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-ink-600">{k as string}</span>
                  <span className="font-semibold">{v as number}</span>
                </div>
              ))}
            </div>
          </MCard>
          <MCard title="Complete your profile">
            <div className="space-y-2.5 p-4">
              <MCheck checked label="Skills and technologies" />
              <MCheck checked label="Services and working style" />
              <MCheck label="Add a third portfolio case study" />
            </div>
          </MCard>
        </div>
      </div>
    </AppFrame>
  );
}

/* 10 ─ Administration */
export function AdminScreen() {
  return (
    <AppFrame role="admin" active="Review queue" path="admin.gab/review" user={{ initials: "AD", name: "Platform admin" }}>
      <PageTitle eyebrow="Administration" title="Marketplace review queue" actions={<MButton variant="secondary">Moderation guidelines</MButton>} />
      <div className="grid grid-cols-4 gap-3">
        <MStat label="Profiles to review" value="12" hint="Demo value" />
        <MStat label="Projects to review" value="5" hint="Demo value" />
        <MStat label="Open reports" value="2" hint="Demo value" />
        <MStat label="Categories" value="11" hint="Active taxonomy" />
      </div>
      <div className="mt-4 grid grid-cols-[1.7fr_1fr] gap-3">
        <MCard title="Queue">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_120px] border-b border-stone-100 bg-[#141416] px-4 py-2 text-[10.5px] uppercase tracking-[0.08em] text-stone-400">
            <span>Item</span>
            <span>Type</span>
            <span>Check</span>
            <span className="text-right">Action</span>
          </div>
          {[
            ["Sample studio profile", "Builder profile", "Portfolio links", "copper"],
            ["Inventory tracker brief", "Project", "Scope completeness", "neutral"],
            ["Sample developer profile", "Builder profile", "Skills evidence", "copper"],
            ["Restaurant ordering app", "Project", "Category match", "neutral"],
            ["Reported message", "Report", "Policy review", "dark"],
          ].map(([t, k, c, tone]) => (
            <div key={t} className="grid grid-cols-[1.4fr_1fr_1fr_120px] items-center border-b border-stone-100 px-4 py-3 text-[12px] last:border-0">
              <span className="font-medium">{t}</span>
              <span className="text-ink-600">{k}</span>
              <MBadge tone={tone as "copper" | "neutral" | "dark"} className="justify-self-start">
                {c}
              </MBadge>
              <span className="flex justify-end gap-1.5">
                <MButton variant="secondary">Review</MButton>
              </span>
            </div>
          ))}
        </MCard>
        <div className="space-y-3">
          <MCard title="Category taxonomy">
            <div className="flex flex-wrap gap-1.5 p-4">
              {["Web", "Mobile", "SaaS", "CRM", "ERP", "Booking", "Dashboards", "Automation", "E-commerce", "AI", "Custom"].map((c) => (
                <MBadge key={c} tone="outline">
                  {c}
                </MBadge>
              ))}
            </div>
          </MCard>
          <MCard title="Review principles">
            <ul className="space-y-2 p-4 text-[12px] text-ink-600">
              <li>• Portfolio items must link to real work</li>
              <li>• Project briefs need a clear problem statement</li>
              <li>• No contact details in public briefs</li>
            </ul>
          </MCard>
        </div>
      </div>
    </AppFrame>
  );
}
