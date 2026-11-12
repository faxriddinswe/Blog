"use client";

import { mq } from "@/lib/motion/media";
import { useMediaQuery } from "./useMediaQuery";

/** True on mouse/trackpad devices — gates cursor and magnetic effects. */
export function useFinePointer(): boolean {
  return useMediaQuery(mq.finePointer, false);
}
