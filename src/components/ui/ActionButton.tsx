import type { ReactNode } from "react";

import {
  LoaderCircle,
} from "lucide-react";

import {
  motion,
  type HTMLMotionProps,
} from "framer-motion";

type ActionButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type ActionButtonProps =
  Omit<
    HTMLMotionProps<"button">,
    "children"
  > & {
    children: ReactNode;

    loading?: boolean;
    loadingText?: string;

    variant?: ActionButtonVariant;

    fullWidth?: boolean;
  };

export default function ActionButton({
  children,

  loading = false,
  loadingText = "Please wait...",

  variant = "primary",

  fullWidth = false,

  disabled,

  className = "",

  type = "button",

  ...props
}: ActionButtonProps) {
  const isDisabled =
    Boolean(disabled) || loading;

  const variantClasses =
    getVariantClasses(variant);

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      whileHover={
        isDisabled
          ? undefined
          : {
              y: -1,
            }
      }
      whileTap={
        isDisabled
          ? undefined
          : {
              scale: 0.98,
            }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
      }}
      className={`
        inline-flex
        min-h-11
        items-center
        justify-center
        gap-2

        rounded-[17px]

        px-4
        py-2.5

        text-sm
        font-semibold

        outline-none

        transition-colors
        duration-200

        focus-visible:ring-4
        focus-visible:ring-blue-500/20

        disabled:cursor-not-allowed
        disabled:opacity-60

        ${
          fullWidth
            ? "w-full"
            : "w-auto"
        }

        ${variantClasses}

        ${className}
      `}
      {...props}
    >
      {loading && (
        <LoaderCircle
          aria-hidden="true"
          className="
            h-4
            w-4
            shrink-0
            animate-spin
          "
        />
      )}

      <span>
        {loading
          ? loadingText
          : children}
      </span>
    </motion.button>
  );
}

function getVariantClasses(
  variant: ActionButtonVariant,
) {
  switch (variant) {
    case "secondary":
      return `
        border
        border-white/70

        bg-white/60
        text-slate-700

        shadow-sm

        hover:bg-white/85

        dark:border-white/10
        dark:bg-white/[0.05]
        dark:text-slate-200
        dark:hover:bg-white/[0.08]
      `;

    case "danger":
      return `
        bg-red-500
        text-white

        shadow-lg
        shadow-red-500/20

        hover:bg-red-600

        dark:bg-red-500
        dark:hover:bg-red-400
      `;

    case "ghost":
      return `
        bg-transparent
        text-slate-600

        hover:bg-white/60
        hover:text-slate-950

        dark:text-slate-300
        dark:hover:bg-white/[0.06]
        dark:hover:text-white
      `;

    case "primary":
    default:
      return `
        bg-blue-600
        text-white

        shadow-lg
        shadow-blue-500/20

        hover:bg-blue-700

        dark:bg-blue-500
        dark:hover:bg-blue-400
      `;
  }
}