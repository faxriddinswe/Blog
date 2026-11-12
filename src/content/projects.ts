import type { Localized } from "./types";

export interface Project {
  slug: string;
  name: string;
  tagline: Localized;
  problem?: Localized;
  solution?: Localized;
  result?: Localized;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Path under /public/images/projects/. */
  cover?: string;
  year?: number;
}

// TODO(owner): real projects (name, tagline, problem/solution/result, stack, links, screenshots).
export const projects: Project[] = [];
