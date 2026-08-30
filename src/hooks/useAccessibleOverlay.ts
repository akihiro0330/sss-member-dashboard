import {
    useEffect,
    useRef,
    type RefObject,
  } from "react";
  
  type AccessibleOverlayOptions = {
    open: boolean;
    onClose: () => void;
    initialFocusSelector?: string;
    restoreFocus?: boolean;
    lockScroll?: boolean;
  };
  
  type AccessibleOverlayResult<T extends HTMLElement> = {
    overlayRef: RefObject<T | null>;
  };
  
  const overlayStack: symbol[] = [];
  let scrollLockCount = 0;
  let previousBodyOverflow = "";
  let previousBodyPaddingRight = "";
  
  const FOCUSABLE_SELECTOR = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable="true"]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");
  
  export function useAccessibleOverlay<
    T extends HTMLElement = HTMLDivElement,
  >({
    open,
    onClose,
    initialFocusSelector,
    restoreFocus = true,
    lockScroll = true,
  }: AccessibleOverlayOptions): AccessibleOverlayResult<T> {
    const overlayRef = useRef<T>(null);
    const overlayIdRef = useRef(Symbol("accessible-overlay"));
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);
    const onCloseRef = useRef(onClose);
  
    useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);
  
    useEffect(() => {
      if (!open) {
        return;
      }
  
      const overlayId = overlayIdRef.current;
      const activeElement = document.activeElement;
  
      previouslyFocusedRef.current =
        activeElement instanceof HTMLElement
          ? activeElement
          : null;
  
      overlayStack.push(overlayId);
  
      if (lockScroll) {
        lockBodyScroll();
      }
  
      const focusTimer = window.setTimeout(() => {
        const overlay = overlayRef.current;
  
        if (!overlay || !isTopOverlay(overlayId)) {
          return;
        }
  
        const requestedTarget = initialFocusSelector
          ? overlay.querySelector<HTMLElement>(initialFocusSelector)
          : null;
  
        const firstFocusable = getFocusableElements(overlay)[0];
        const target = requestedTarget ?? firstFocusable ?? overlay;
  
        target.focus({ preventScroll: true });
      }, 0);
  
      function handleKeyDown(event: KeyboardEvent) {
        if (!isTopOverlay(overlayId)) {
          return;
        }
  
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onCloseRef.current();
          return;
        }
  
        if (event.key !== "Tab") {
          return;
        }
  
        const overlay = overlayRef.current;
  
        if (!overlay) {
          return;
        }
  
        const focusable = getFocusableElements(overlay);
  
        if (focusable.length === 0) {
          event.preventDefault();
          overlay.focus({ preventScroll: true });
          return;
        }
  
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
  
        if (event.shiftKey) {
          if (active === first || !overlay.contains(active)) {
            event.preventDefault();
            last.focus();
          }
          return;
        }
  
        if (active === last || !overlay.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
  
      document.addEventListener("keydown", handleKeyDown, true);
  
      return () => {
        window.clearTimeout(focusTimer);
        document.removeEventListener("keydown", handleKeyDown, true);
  
        removeOverlayFromStack(overlayId);
  
        if (lockScroll) {
          unlockBodyScroll();
        }
  
        if (restoreFocus) {
          const previous = previouslyFocusedRef.current;
  
          window.setTimeout(() => {
            if (previous?.isConnected) {
              previous.focus({ preventScroll: true });
            }
          }, 0);
        }
      };
    }, [
      initialFocusSelector,
      lockScroll,
      open,
      restoreFocus,
    ]);
  
    return { overlayRef };
  }
  
  function getFocusableElements(container: HTMLElement) {
    return Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => {
      if (element.getAttribute("aria-hidden") === "true") {
        return false;
      }
  
      if (element.hidden) {
        return false;
      }
  
      const style = window.getComputedStyle(element);
  
      return (
        style.display !== "none" &&
        style.visibility !== "hidden"
      );
    });
  }
  
  function isTopOverlay(id: symbol) {
    return overlayStack[overlayStack.length - 1] === id;
  }
  
  function removeOverlayFromStack(id: symbol) {
    const index = overlayStack.lastIndexOf(id);
  
    if (index >= 0) {
      overlayStack.splice(index, 1);
    }
  }
  
  function lockBodyScroll() {
    if (scrollLockCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
      previousBodyPaddingRight = document.body.style.paddingRight;
  
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
  
      document.body.style.overflow = "hidden";
  
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
  
    scrollLockCount += 1;
  }
  
  function unlockBodyScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
  
    if (scrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
    }
  }
  