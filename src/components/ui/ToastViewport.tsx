import {
    AlertTriangle,
    Check,
    Info,
    ShieldAlert,
    X,
  } from "lucide-react";
  
  import {
    AnimatePresence,
    motion,
  } from "framer-motion";
  
  import {
    useToast,
    type ToastType,
  } from "../../context/ToastContext";
  
  export default function ToastViewport() {
    const { toasts, dismissToast } = useToast();
  
    return (
      <div
        className="
          pointer-events-none
          fixed
          left-4
          right-4
          top-4
          z-[200]
  
          flex
          flex-col
          items-end
          gap-2
  
          sm:left-auto
          sm:right-5
          sm:w-[390px]
  
          md:top-5
        "
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{
                opacity: 0,
                y: -16,
                scale: 0.96,
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
                x: 30,
                scale: 0.96,
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                stiffness: 390,
                damping: 30,
              }}
              className="
                glass-strong
                pointer-events-auto
                w-full
                overflow-hidden
                rounded-[22px]
                p-3
              "
            >
              <div className="flex items-start gap-3">
                <ToastIcon type={toast.type} />
  
                <div className="min-w-0 flex-1 py-0.5">
                  <p
                    className="
                      text-sm
                      font-semibold
                      tracking-[-0.01em]
                      text-slate-950
                      dark:text-white
                    "
                  >
                    {toast.title}
                  </p>
  
                  {toast.description && (
                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {toast.description}
                    </p>
                  )}
                </div>
  
                <button
                  type="button"
                  onClick={() =>
                    dismissToast(toast.id)
                  }
                  aria-label="Dismiss notification"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-slate-400
                    transition
                    hover:bg-white/60
                    hover:text-slate-700
                    active:scale-90
  
                    dark:hover:bg-white/[0.06]
                    dark:hover:text-white
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
  
  function ToastIcon({
    type,
  }: {
    type: ToastType;
  }) {
    if (type === "success") {
      return (
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            bg-emerald-50
            text-emerald-600
  
            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
        >
          <Check className="h-4 w-4" />
        </div>
      );
    }
  
    if (type === "warning") {
      return (
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            bg-amber-50
            text-amber-600
  
            dark:bg-amber-500/10
            dark:text-amber-400
          "
        >
          <AlertTriangle className="h-4 w-4" />
        </div>
      );
    }
  
    if (type === "error") {
      return (
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            bg-red-50
            text-red-600
  
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          <ShieldAlert className="h-4 w-4" />
        </div>
      );
    }
  
    return (
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-[14px]
          bg-blue-50
          text-blue-600
  
          dark:bg-blue-500/10
          dark:text-blue-400
        "
      >
        <Info className="h-4 w-4" />
      </div>
    );
  }