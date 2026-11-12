"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { duration, ease } from "./tokens";

// Register once per client bundle. GSAP + all plugins are free under the
// GSAP Standard License (verified 2026-11-12, see docs/ARCHITECTURE.md).
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: ease.gsap, duration: duration.base });

export { gsap, ScrollTrigger, SplitText, useGSAP };
