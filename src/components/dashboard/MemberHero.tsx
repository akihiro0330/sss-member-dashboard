import {
  Eye,
  EyeOff,
  User,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  memberMetrics,
} from "../../data/dashboard";

import {
  demoMemberIdentity,
  getMemberFirstName,
  readMemberProfile,
} from "../../data/member";

import {
  useGreeting,
} from "../../hooks/useGreeting";

import {
  useUI,
} from "../../context/UIContext";

export default function MemberHero() {
  const greeting =
    useGreeting();

  const {
    hideSSNumber,
    toggleSSNumberVisibility,

    hideContributions,
    toggleContributionVisibility,
  } = useUI();

  const member =
    readMemberProfile();

  const firstName =
    getMemberFirstName(
      member.fullName,
    );

  const ssNumber =
    demoMemberIdentity.ssNumber;

  function getMetricValue(
    label: string,
    originalValue: string,
  ) {
    if (
      label === "Total contributions" &&
      hideContributions
    ) {
      return "₱••,•••";
    }

    if (
      label === "Contribution months" &&
      hideContributions
    ) {
      return "••";
    }

    return originalValue;
  }

  function getMetricCaption(
    label: string,
    originalCaption: string,
  ) {
    if (
      label === "Total contributions" &&
      hideContributions
    ) {
      return "Contribution amount hidden";
    }

    if (
      label === "Contribution months" &&
      hideContributions
    ) {
      return "Contribution count hidden";
    }

    return originalCaption;
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.08,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        glass-strong
        relative
        overflow-hidden
        rounded-[28px]
        p-5

        sm:rounded-[32px]
        sm:p-7

        lg:p-9

        xl:p-10
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-32
          h-80
          w-80
          rounded-full
          bg-blue-400/15
          blur-3xl

          dark:bg-blue-500/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-36
          left-[35%]
          h-72
          w-72
          rounded-full
          bg-cyan-300/20
          blur-3xl

          dark:bg-cyan-400/10
        "
      />

      <div
        className="
          relative
          grid
          grid-cols-1
          gap-8

          lg:grid-cols-[1.35fr_1fr]
          lg:items-end
        "
      >
        {/* LEFT SIDE */}
        <div>
          <motion.div
            initial={{
              opacity: 0,
              x: -12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
            className="
              mb-6
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-blue-600/10
                text-blue-700

                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <User className="h-5 w-5" />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-blue-600

                  dark:text-blue-400
                "
              >
                Member Overview
              </p>

              <p
                className="
                  text-xs
                  text-slate-400

                  dark:text-slate-400
                "
              >
                Your Social Security account
              </p>
            </div>
          </motion.div>

          {/* Dynamic greeting */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.45,
            }}
            className="
              max-w-3xl

              text-[2rem]
              font-semibold
              leading-[1.04]
              tracking-[-0.045em]

              text-slate-950

              dark:text-white

              sm:text-4xl
              lg:text-5xl
              xl:text-[3.4rem]
            "
          >
            {greeting},

            <span
              className="
                block

                bg-gradient-to-r
                from-blue-700
                to-cyan-500

                bg-clip-text
                text-transparent

                dark:from-blue-400
                dark:to-cyan-300
              "
            >
              {firstName}.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.36,
              duration: 0.4,
            }}
            className="
              mt-4
              max-w-2xl

              text-sm
              leading-6

              text-slate-500

              dark:text-slate-300

              sm:text-base
              sm:leading-7
            "
          >
            Here’s a quick overview of your membership,
            contributions, and current account standing.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.42,
              duration: 0.45,
            }}
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {/* Active member */}
            <div
              className="
                flex
                items-center
                gap-2

                rounded-full

                bg-emerald-50/80

                px-3
                py-2

                text-xs
                font-semibold

                text-emerald-700

                dark:bg-emerald-500/10
                dark:text-emerald-300
              "
            >
              <span
                className="
                  h-2
                  w-2

                  rounded-full

                  bg-emerald-500

                  shadow-[0_0_0_4px_rgba(16,185,129,0.12)]
                "
              />

              {demoMemberIdentity.membershipStatus}
            </div>

            {/* SS Number */}
            <div
              className="
                flex
                items-center
                gap-2

                rounded-full

                border
                border-white/70

                bg-white/50

                py-1.5
                pl-3
                pr-1.5

                text-xs
                font-medium

                text-slate-500

                dark:border-white/10
                dark:bg-white/[0.05]
                dark:text-slate-300
              "
            >
              <span>
                SS Number
              </span>

              <span
                className="
                  min-w-[92px]

                  font-mono

                  tracking-[0.04em]
                "
              >
                {hideSSNumber
                  ? "•••-•••••••-•"
                  : ssNumber}
              </span>

              <motion.button
                type="button"
                onClick={
                  toggleSSNumberVisibility
                }
                whileTap={{
                  scale: 0.88,
                }}
                aria-label={
                  hideSSNumber
                    ? "Show SS Number"
                    : "Hide SS Number"
                }
                title={
                  hideSSNumber
                    ? "Show SS Number"
                    : "Hide SS Number"
                }
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  text-slate-400

                  transition-colors

                  hover:bg-white/80
                  hover:text-blue-600

                  dark:hover:bg-white/[0.08]
                  dark:hover:text-blue-400
                "
              >
                {hideSSNumber ? (
                  <Eye className="h-3.5 w-3.5" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE - METRICS */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},

            show: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.35,
              },
            },
          }}
          className="
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-3

            lg:grid-cols-1

            xl:grid-cols-3
          "
        >
          {memberMetrics.map(
            (metric) => {
              const isContributionMetric =
                metric.label ===
                  "Total contributions" ||
                metric.label ===
                  "Contribution months";

              const showPrivacyButton =
                metric.label ===
                "Total contributions";

              return (
                <motion.div
                  key={metric.label}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 18,
                      scale: 0.98,
                    },

                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,

                      transition: {
                        duration: 0.42,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      },
                    },
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.015,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 330,
                    damping: 24,
                  }}
                  className="
                    group

                    relative

                    rounded-[22px]

                    border
                    border-white/70

                    bg-white/55

                    p-4

                    shadow-[0_12px_30px_rgba(32,79,125,0.06)]

                    backdrop-blur-xl

                    dark:border-white/10
                    dark:bg-white/[0.055]
                    dark:shadow-[0_18px_40px_rgba(0,0,0,0.2)]

                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <p
                      className="
                        text-xs
                        font-medium

                        text-slate-400

                        dark:text-slate-400
                      "
                    >
                      {metric.label}
                    </p>

                    {showPrivacyButton && (
                      <motion.button
                        type="button"
                        onClick={
                          toggleContributionVisibility
                        }
                        whileTap={{
                          scale: 0.88,
                        }}
                        aria-label={
                          hideContributions
                            ? "Show contribution information"
                            : "Hide contribution information"
                        }
                        title={
                          hideContributions
                            ? "Show contribution information"
                            : "Hide contribution information"
                        }
                        className="
                          -mr-1
                          -mt-1

                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center

                          rounded-full

                          bg-white/45

                          text-slate-400

                          transition-colors

                          hover:bg-white/80
                          hover:text-blue-600

                          dark:bg-white/[0.04]
                          dark:hover:bg-white/[0.08]
                          dark:hover:text-blue-400
                        "
                      >
                        {hideContributions ? (
                          <Eye className="h-3.5 w-3.5" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5" />
                        )}
                      </motion.button>
                    )}
                  </div>

                  <motion.p
                    key={
                      isContributionMetric
                        ? `${metric.label}-${hideContributions}`
                        : metric.label
                    }
                    initial={{
                      opacity: 0.55,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      mt-2

                      text-2xl
                      font-semibold

                      tracking-[-0.04em]

                      text-slate-950

                      dark:text-white

                      sm:text-[1.65rem]
                    "
                  >
                    {getMetricValue(
                      metric.label,
                      metric.value,
                    )}
                  </motion.p>

                  <p
                    className="
                      mt-1

                      text-xs
                      leading-5

                      text-slate-400

                      dark:text-slate-400
                    "
                  >
                    {getMetricCaption(
                      metric.label,
                      metric.caption,
                    )}
                  </p>

                  <div
                    className="
                      mt-4

                      h-[2px]

                      overflow-hidden

                      rounded-full

                      bg-slate-100

                      dark:bg-white/10
                    "
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width:
                          hideContributions &&
                          isContributionMetric
                            ? "28%"
                            : "58%",
                      }}
                      transition={{
                        delay: 0.65,
                        duration: 0.8,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        h-full

                        rounded-full

                        bg-gradient-to-r
                        from-blue-500
                        to-cyan-400
                      "
                    />
                  </div>
                </motion.div>
              );
            },
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}