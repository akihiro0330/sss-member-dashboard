import {
  useId,
  type ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useAccessibleOverlay,
} from "../../hooks/useAccessibleOverlay";

import ActionButton from "./ActionButton";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;

  confirmLabel?: string;
  cancelLabel?: string;

  loading?: boolean;
  loadingText?: string;

  icon?: ReactNode;
  helperText?: string;

  destructive?: boolean;

  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,

  confirmLabel = "Confirm",
  cancelLabel = "Cancel",

  loading = false,
  loadingText = "Please wait...",

  icon,
  helperText,

  destructive = false,

  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  function closeDialog() {
    if (!loading) {
      onCancel();
    }
  }

  const {
    overlayRef,
  } = useAccessibleOverlay({
    open,
    onClose: closeDialog,
    initialFocusSelector: '[data-dialog-cancel="true"]',
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close confirmation dialog"
            tabIndex={-1}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={closeDialog}
            className="
              fixed
              inset-0
              z-[110]

              cursor-default

              bg-slate-950/30
              backdrop-blur-[6px]

              dark:bg-black/60
            "
          />

          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.95,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 16,
              scale: 0.96,
              filter: "blur(4px)",
            }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 29,
            }}
            className="
              glass-strong

              fixed

              bottom-5
              left-4
              right-4

              z-[120]

              rounded-[30px]

              p-5

              sm:bottom-auto
              sm:left-1/2
              sm:right-auto
              sm:top-1/2

              sm:w-[430px]

              sm:-translate-x-1/2
              sm:-translate-y-1/2

              sm:p-6
            "
          >
            {icon && (
              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-[18px]

                  ${
                    destructive
                      ? `
                        bg-red-50
                        text-red-600

                        dark:bg-red-500/10
                        dark:text-red-400
                      `
                      : `
                        bg-blue-50
                        text-blue-600

                        dark:bg-blue-500/10
                        dark:text-blue-400
                      `
                  }
                `}
              >
                {icon}
              </div>
            )}

            <h2
              id={titleId}
              className="
                mt-6

                text-2xl
                font-semibold

                tracking-[-0.04em]

                text-slate-950

                dark:text-white
              "
            >
              {title}
            </h2>

            <p
              id={descriptionId}
              className="
                mt-3

                text-sm
                leading-6

                text-slate-500

                dark:text-slate-300
              "
            >
              {description}
            </p>

            {helperText && (
              <div
                className="
                  mt-5

                  rounded-[18px]

                  border
                  border-white/60

                  bg-white/40

                  p-4

                  dark:border-white/10
                  dark:bg-white/[0.035]
                "
              >
                <p
                  className="
                    text-xs
                    leading-5

                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {helperText}
                </p>
              </div>
            )}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <ActionButton
                data-dialog-cancel="true"
                variant="secondary"
                disabled={loading}
                onClick={onCancel}
                fullWidth
              >
                {cancelLabel}
              </ActionButton>

              <ActionButton
                variant={
                  destructive
                    ? "danger"
                    : "primary"
                }
                loading={loading}
                loadingText={loadingText}
                onClick={onConfirm}
                fullWidth
              >
                {confirmLabel}
              </ActionButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
