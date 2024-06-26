"use client";

import { useFormStatus } from "react-dom";

export default function SendToMenu() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-lg bg-neutral-200 px-5 py-2 transition-colors hover:bg-neutral-300 disabled:opacity-15"
      disabled={pending}
    >
      Send to menu
    </button>
  );
}
