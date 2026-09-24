"use client";

import { Menu } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { ComponentType } from "react";
import type { MobileDrawerContentProps } from "./mobile-drawer-content";

let drawerModule: Promise<typeof import("./mobile-drawer-content")> | undefined;

function loadDrawer() {
  drawerModule ??= import("./mobile-drawer-content").catch((error) => {
    drawerModule = undefined;
    throw error;
  });
  return drawerModule;
}

export function MobileDrawer() {
  const [Content, setContent] =
    useState<ComponentType<MobileDrawerContentProps> | null>(null);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  const prepare = () => {
    if (Content) return;
    setFailed(false);
    void loadDrawer().then(
      ({ MobileDrawerContent }) => setContent(() => MobileDrawerContent),
      () => setFailed(true),
    );
  };

  useEffect(() => {
    if (!open) return;
    // Escape also cancels an opening request while the chunk is in flight.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open && !!Content}
        aria-controls={Content ? id : undefined}
        aria-busy={open && !Content && !failed}
        className="inline-flex h-11 w-11 items-center justify-center -mr-2"
        onPointerEnter={prepare}
        onPointerDown={prepare}
        onFocus={prepare}
        onClick={() => {
          setOpen(true);
          prepare();
        }}
      >
        <Menu className="size-6" />
      </button>
      {failed && open && (
        <span role="status" className="sr-only">
          Menu could not load. Activate Open menu to retry.
        </span>
      )}
      {Content && (
        <Content
          id={id}
          open={open}
          onOpenChange={setOpen}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus();
          }}
        />
      )}
    </>
  );
}
