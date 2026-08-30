import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Eye,
  EyeOff,
  HeartHandshake,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import GlassCard from "../ui/GlassCard";
import AnimatedNumber from "../ui/AnimatedNumber";

import {
  useNavigation,
} from "../../context/NavigationContext";

import {
  useUI,
} from "../../context/UIContext";

const cards = [
  {
    title: "Contributions",
    icon: WalletCards,

    value: "₱51,335",

    subtitle:
      "20 contributions posted",

    badge: "+5 this year",

    badgeIcon: TrendingUp,

    action:
      "View contribution history",

    page:
      "contributions" as const,
  },

  {
    title: "Loans",

    icon: CreditCard,

    value:
      "No active loan",

    subtitle:
      "Your account has no outstanding balance",

    badge:
      "Clear",

    badgeIcon:
      CheckCircle2,

    action:
      "Explore loan options",

    page:
      "loans" as const,
  },

  {
    title: "Benefits",

    icon:
      HeartHandshake,

    value:
      "SSS Benefits",

    subtitle:
      "Explore benefits available to eligible members",

    badge:
      "View eligibility",

    badgeIcon:
      CheckCircle2,

    action:
      "Explore benefits",

    page:
      "benefits" as const,
  },
];

const chartData = [
  26,
  38,
  32,
  52,
  46,
  66,
  58,
  76,
  62,
  88,
  79,
  96,
];

export default function DashboardCards() {
  const {
    navigate,
  } = useNavigation();

  const {
    hideContributions,
    toggleContributionVisibility,
  } = useUI();

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},

        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
      className="
        mt-5

        grid
        grid-cols-1
        gap-4

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {cards.map(
        (card) => {
          const Icon =
            card.icon;

          const BadgeIcon =
            card.badgeIcon;

          const isContributions =
            card.title ===
            "Contributions";

          return (
            <motion.div
              key={card.title}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 24,
                  scale: 0.98,
                },

                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,

                  transition: {
                    duration: 0.48,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  },
                },
              }}
              className="h-full"
            >
              <GlassCard className="h-full p-5 sm:p-6">
                <div className="flex h-full flex-col">
                  {/* HEADER */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center

                        rounded-2xl

                        bg-blue-600/10

                        text-blue-700

                        dark:bg-blue-500/10
                        dark:text-blue-400
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          flex
                          items-center
                          gap-1.5

                          rounded-full

                          border
                          border-white/60

                          bg-white/65

                          px-3
                          py-1.5

                          text-[11px]
                          font-semibold

                          text-slate-500

                          dark:border-white/10
                          dark:bg-white/[0.06]
                          dark:text-slate-300
                        "
                      >
                        <BadgeIcon className="h-3.5 w-3.5" />

                        {isContributions &&
                        hideContributions
                          ? "•• this year"
                          : card.badge}
                      </span>

                      {isContributions && (
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
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center

                            rounded-full

                            border
                            border-white/60

                            bg-white/65

                            text-slate-400

                            transition-colors

                            hover:bg-white/90
                            hover:text-blue-600

                            dark:border-white/10
                            dark:bg-white/[0.06]
                            dark:text-slate-400
                            dark:hover:bg-white/[0.1]
                            dark:hover:text-blue-400
                          "
                        >
                          {hideContributions ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="mt-7">
                    <p
                      className="
                        text-sm
                        font-medium

                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      {card.title}
                    </p>

                    <h2
                      className="
                        mt-2

                        min-h-[36px]

                        text-2xl
                        font-semibold

                        tracking-[-0.04em]

                        text-slate-950

                        dark:text-white

                        sm:text-3xl
                      "
                    >
                      {isContributions ? (
                        <motion.span
                          key={
                            hideContributions
                              ? "hidden"
                              : "visible"
                          }
                          initial={{
                            opacity: 0.4,
                            y: 2,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                        >
                          {hideContributions ? (
                            "₱••,•••"
                          ) : (
                            <AnimatedNumber
                              value={51335}
                              prefix="₱"
                              duration={1300}
                            />
                          )}
                        </motion.span>
                      ) : (
                        card.value
                      )}
                    </h2>

                    <p
                      className="
                        mt-2
                        max-w-sm

                        text-sm
                        leading-6

                        text-slate-500

                        dark:text-slate-300
                      "
                    >
                      {isContributions &&
                      hideContributions
                        ? "•• contributions posted"
                        : card.subtitle}
                    </p>
                  </div>

                  {/* CONTRIBUTION MINI CHART */}
                  {isContributions && (
                    <div
                      className={`
                        relative

                        mt-6

                        flex
                        h-16
                        items-end
                        gap-1.5

                        overflow-hidden

                        rounded-[18px]

                        bg-slate-50/60

                        px-3
                        pt-3

                        transition

                        dark:bg-white/[0.025]

                        ${
                          hideContributions
                            ? "opacity-45"
                            : ""
                        }
                      `}
                      aria-label={
                        hideContributions
                          ? "Contribution trend hidden"
                          : "Contribution trend"
                      }
                    >
                      {chartData.map(
                        (
                          height,
                          index,
                        ) => (
                          <motion.div
                            key={
                              index
                            }
                            initial={{
                              height: 0,
                              opacity: 0.4,
                            }}
                            animate={{
                              height:
                                hideContributions
                                  ? "30%"
                                  : `${height}%`,

                              opacity:
                                hideContributions
                                  ? 0.35
                                  : 0.8,
                            }}
                            transition={{
                              delay:
                                0.45 +
                                index *
                                  0.035,

                              duration:
                                0.45,

                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            }}
                            whileHover={
                              hideContributions
                                ? undefined
                                : {
                                    opacity:
                                      1,
                                  }
                            }
                            className="
                              min-w-0
                              flex-1

                              rounded-t-full

                              bg-gradient-to-t
                              from-blue-600
                              to-cyan-400
                            "
                          />
                        ),
                      )}

                      {hideContributions && (
                        <motion.div
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="
                            absolute
                            inset-0

                            flex
                            items-center
                            justify-center

                            bg-white/20

                            backdrop-blur-[2px]

                            dark:bg-slate-950/10
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-2

                              rounded-full

                              border
                              border-white/60

                              bg-white/75

                              px-3
                              py-1.5

                              text-[10px]
                              font-semibold

                              text-slate-500

                              shadow-sm

                              dark:border-white/10
                              dark:bg-slate-900/75
                              dark:text-slate-300
                            "
                          >
                            <EyeOff className="h-3 w-3" />

                            Hidden
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* DIVIDER FOR OTHER CARDS */}
                  {!isContributions && (
                    <div
                      className="
                        mt-6

                        h-px

                        bg-slate-200/70

                        dark:bg-white/10
                      "
                    />
                  )}

                  {/* NAVIGATION ACTION */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        card.page,
                      )
                    }
                    className="
                      group/action

                      mt-auto

                      flex
                      w-fit
                      items-center
                      gap-2

                      pt-7

                      text-sm
                      font-semibold

                      text-blue-700

                      transition-colors

                      hover:text-blue-800

                      dark:text-blue-400
                      dark:hover:text-blue-300
                    "
                  >
                    {card.action}

                    <ArrowUpRight
                      className="
                        h-4
                        w-4

                        transition-transform
                        duration-300

                        group-hover/action:-translate-y-0.5
                        group-hover/action:translate-x-0.5
                      "
                    />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          );
        },
      )}
    </motion.section>
  );
}