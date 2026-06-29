import { AppShell } from "@/components/app-shell";

const ACCENTS = [
  { name: "Sahayak", color: "#1F6FEB", soft: "#ECF2FE", softBorder: "#DCE7FD", note: "Trust · clarity · calm", current: true },
  { name: "Sahayak", color: "#4F46E5", soft: "#EEEEFE", softBorder: "#E0E0FB", note: "Indigo · modern" },
  { name: "Sahayak", color: "#0F766E", soft: "#E6F4F1", softBorder: "#CFE9E3", note: "Teal · reassuring" },
  { name: "Sahayak", color: "#0E1116", soft: "#F1F3F6", softBorder: "#E5E8EC", note: "Monochrome · stark" },
];

const COLORS = [
  { name: "Ink", hex: "#0E1116", border: "#0E1116" },
  { name: "Text", hex: "#5A6472" },
  { name: "Canvas", hex: "#F6F7F9", border: "#E8EAEE" },
  { name: "Accent", hex: "#1F6FEB" },
  { name: "Success", hex: "#16A34A" },
  { name: "Gold", hex: "#B5862B" },
];

const STATUS = [
  { label: "Verified", c: "#16794A", bg: "#E9F7EF", bd: "#D2EEDD" },
  { label: "In progress", c: "#1856C9", bg: "#ECF2FE", bd: "#DCE7FD" },
  { label: "Attention", c: "#B4231F", bg: "#FCEDED", bd: "#F5D9D7" },
];

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-[34px] font-mono text-[11px] uppercase tracking-[.08em] text-[#9AA2AF]">{children}</div>
);

export default function DesignSystemPage() {
  return (
    <AppShell active="system" title="Design System" desc="Foundations, components and brand">
      <div className="mx-auto max-w-[1000px] px-5 py-7 sm:px-8 sm:pb-16">
        <div className="max-w-[600px]">
          <h2 className="text-[24px] font-semibold tracking-[-.025em] text-[#0E1116]">The VidhiSahayak system</h2>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-[#5A6472]">One restrained, typographic language across marketing and product. Ink for hierarchy, a single blue accent for action, hairline borders, and a monospace voice for legal references.</p>
        </div>

        {/* Brand direction */}
        <Section>Brand direction · accent options</Section>
        <div className="mt-3.5 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {ACCENTS.map((a, i) => (
            <div key={i} className="relative rounded-[13px] bg-white p-4" style={{ border: a.current ? "1.5px solid #0E1116" : "1px solid #E8EAEE" }}>
              {a.current && <div className="absolute right-[11px] top-[11px] rounded-[5px] bg-[#0E1116] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-white">CURRENT</div>}
              <div className="text-[15px] font-semibold text-[#0E1116]">Vidhi<span style={{ color: a.color }}>{a.name}</span></div>
              <div className="mt-3.5 flex gap-1.5">
                <span className="h-[22px] w-[22px] rounded-[6px]" style={{ background: a.color }} />
                <span className="h-[22px] w-[22px] rounded-[6px]" style={{ background: a.soft, border: `1px solid ${a.softBorder}` }} />
              </div>
              <div className="mt-3.5 rounded-[7px] p-[7px] text-center text-[12px] font-medium text-white" style={{ background: a.color }}>Primary</div>
              <div className="mt-2 text-[11.5px] text-[#8B93A1]">{a.note}</div>
            </div>
          ))}
        </div>

        {/* Color */}
        <Section>Color</Section>
        <div className="mt-3.5 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {COLORS.map((c) => (
            <div key={c.name}>
              <div className="h-[54px] rounded-[9px]" style={{ background: c.hex, border: `1px solid ${c.border ?? c.hex}` }} />
              <div className="mt-[7px] text-[11.5px] font-semibold text-[#0E1116]">{c.name}</div>
              <div className="font-mono text-[10px] text-[#9AA2AF]">{c.hex}</div>
            </div>
          ))}
        </div>

        {/* Type + components */}
        <div className="mt-[34px] grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-[14px] border border-[#E8EAEE] bg-white p-5">
            <div className="font-mono text-[11px] uppercase tracking-[.08em] text-[#9AA2AF]">Type · Geist</div>
            <div className="mt-3.5 text-[30px] font-semibold tracking-[-.025em] text-[#0E1116]">Display 30 / 600</div>
            <div className="mt-2.5 text-[20px] font-semibold text-[#0E1116]">Heading 20 / 600</div>
            <div className="mt-2.5 text-[14.5px] leading-[1.6] text-[#1B2027]">Body 14.5 — clear, legible paragraph text for guidance and legal explanations.</div>
            <div className="mt-2.5 font-mono text-[12px] text-[#1856C9]">Mono · IPC §420 · ₹31/min</div>
          </div>
          <div className="rounded-[14px] border border-[#E8EAEE] bg-white p-5">
            <div className="font-mono text-[11px] uppercase tracking-[.08em] text-[#9AA2AF]">Buttons &amp; inputs</div>
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              <span className="rounded-[8px] bg-[#0E1116] px-[15px] py-[9px] text-[13px] font-medium text-white">Primary</span>
              <span className="rounded-[8px] border border-[#E1E4E9] bg-white px-[15px] py-[9px] text-[13px] font-medium text-[#0E1116]">Secondary</span>
              <span className="rounded-[8px] border border-[#DCE7FD] bg-[#ECF2FE] px-[15px] py-[9px] text-[13px] font-medium text-[#1856C9]">Accent</span>
            </div>
            <input placeholder="Input field" className="mt-3.5 w-full rounded-[9px] border border-[#E1E4E9] bg-white px-[11px] py-[9px] text-[13.5px] text-[#0E1116] outline-none focus:border-[#1F6FEB] focus:shadow-[0_0_0_3px_rgba(31,111,235,.13)]" />
            <div className="mt-3.5 flex flex-wrap gap-[7px]">
              {STATUS.map((s) => (
                <span key={s.label} className="rounded-[6px] px-2 py-[3px] font-mono text-[10.5px] font-semibold" style={{ color: s.c, background: s.bg, border: `1px solid ${s.bd}` }}>{s.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
