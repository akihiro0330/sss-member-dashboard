import { motion } from "framer-motion";

export default function PageLoadingSkeleton() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.18,
      }}
      className="space-y-5"
      aria-label="Loading page"
      aria-busy="true"
    >
      {/* HEADER */}
      <div className="glass-strong rounded-[30px] p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-3 w-24" />

            <Skeleton className="mt-4 h-8 w-[70%] max-w-[420px] sm:h-10" />

            <Skeleton className="mt-3 h-4 w-[90%] max-w-[560px]" />

            <Skeleton className="mt-2 h-4 w-[60%] max-w-[360px]" />
          </div>

          <Skeleton className="h-11 w-32 rounded-[17px]" />
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="glass rounded-[26px] p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-10 w-10 rounded-[15px]" />

              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            <Skeleton className="mt-6 h-4 w-28" />

            <Skeleton className="mt-3 h-8 w-32" />

            <Skeleton className="mt-3 h-3 w-36" />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
        <div className="glass rounded-[28px] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="mt-2 h-3 w-52" />
            </div>

            <Skeleton className="h-9 w-24 rounded-[15px]" />
          </div>

          <div className="mt-7 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-4

                  rounded-[20px]

                  border
                  border-white/40

                  bg-white/25

                  p-4

                  dark:border-white/[0.05]
                  dark:bg-white/[0.025]
                "
              >
                <Skeleton className="h-10 w-10 shrink-0 rounded-[14px]" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-[45%]" />
                  <Skeleton className="mt-2 h-3 w-[70%]" />
                </div>

                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[28px] p-5 sm:p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-3 w-44" />

          <div className="mt-7 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="
                  rounded-[20px]

                  border
                  border-white/40

                  bg-white/25

                  p-4

                  dark:border-white/[0.05]
                  dark:bg-white/[0.025]
                "
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-[13px]" />

                  <div className="flex-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="mt-2 h-3 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden

        rounded-lg

        bg-slate-200/70

        dark:bg-white/[0.07]

        ${className}
      `}
    >
      <motion.div
        animate={{
          x: ["-120%", "220%"],
        }}
        transition={{
          duration: 1.45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-y-0

          w-1/2

          bg-gradient-to-r
          from-transparent
          via-white/50
          to-transparent

          dark:via-white/[0.06]
        "
      />
    </div>
  );
}