/**
 * Decorative background fragments for the hero (brief §9). They are generic
 * illustrations of the craft, not claims about specific projects.
 * Telegram copy is localized in messages (Hero.fragments).
 */
export type FragmentKind = "code" | "terminal" | "telegram";

export interface HeroFragment {
  id: string;
  kind: FragmentKind;
  /** Position in % of the hero box; only shown ≥ xl, placed clear of the text column. */
  top: string;
  side: "left" | "right";
  inset: string;
  /** Seconds offset for the float loop so fragments drift out of phase. */
  phase: number;
  lines?: string[];
}

export const heroFragments: HeroFragment[] = [
  {
    id: "agent",
    kind: "code",
    top: "9%",
    side: "left",
    inset: "30%",
    phase: 0,
    lines: [
      "async def run(task: Task) -> Result:",
      "    plan = await agent.plan(task)",
      "    for step in plan:",
      "        await tools.call(step)",
      "    return plan.result()",
    ],
  },
  {
    id: "terminal",
    kind: "terminal",
    top: "11%",
    side: "left",
    inset: "3%",
    phase: 2.2,
    lines: ["$ uvicorn app.main:api --workers 4", "INFO  Application startup complete."],
  },
  {
    id: "telegram",
    kind: "telegram",
    top: "80%",
    side: "left",
    inset: "3%",
    phase: 1.1,
  },
];
