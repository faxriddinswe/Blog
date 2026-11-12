import type { ServiceIcon as IconName } from "@/content/services";

// 24×24 stroke icons, drawn for this site (no icon library on the client).
const PATHS: Record<IconName, string> = {
  agent:
    "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  bot: "M8 9h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3zM12 5v4M9.5 13.5h.01M14.5 13.5h.01M9 17h6",
  server: "M4 5h16v5H4zM4 14h16v5H4zM7.5 7.5h.01M7.5 16.5h.01M11 7.5h6M11 16.5h6",
  workflow:
    "M5 6h5v5H5zM14 13h5v5h-5zM10 8.5h3a2 2 0 0 1 2 2V13M7.5 11v3a2 2 0 0 0 2 2H14",
  knowledge:
    "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5zM9 8h7M9 11.5h5",
  integration: "M9 7V4M15 7V4M7 7h10v4a5 5 0 0 1-10 0zM12 16v4",
};

export function ServiceIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
