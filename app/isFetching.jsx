import { useTransition } from "@remix-run/react";

export default function useIsFetching() {
  const { state } = useTransition();
  if (state === "idle") return false;
  return true;
}
