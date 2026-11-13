import type Lenis from "lenis";

/** The live Lenis instance (null when smooth scroll is off), for scrollTo calls elsewhere. */
let instance: Lenis | null = null;

export const lenisStore = {
  get: () => instance,
  set: (next: Lenis | null) => {
    instance = next;
  },
};
