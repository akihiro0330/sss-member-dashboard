import {
  CheckCircle2,
  LogIn,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";

const activities = [
  {
    title: "Contribution posted",
    description:
      "Your latest monthly contribution was successfully recorded.",
    time: "Today, 10:24 AM",
    icon: WalletCards,
  },
  {
    title: "Account verification completed",
    description:
      "Your member profile remains verified and active.",
    time: "August 26",
    icon: ShieldCheck,
  },
  {
    title: "Successful login",
    description:
      "New browser session authenticated successfully.",
    time: "August 25",
    icon: LogIn,
  },
  {
    title: "Member record updated",
    description:
      "Your account information was successfully saved.",
    time: "August 18",
    icon: CheckCircle2,
  },
];

export default function RecentActivity() {
  return (
    <GlassCard className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.16em]
              text-blue-600
              dark:text-blue-400
            "
          >
            Account
          </p>

          <h2
            className="
              mt-2
              text-xl
              font-semibold
              tracking-[-0.035em]
              text-slate-950
              dark:text-white
              sm:text-2xl
            "
          >
            Recent Activity
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-300
            "
          >
            Recent events related to your SSS account.
          </p>
        </div>

        <button
          type="button"
          className="
            hidden
            rounded-full
            border
            border-white/60
            bg-white/60
            px-3
            py-2
            text-xs
            font-semibold
            text-blue-700
            transition
            hover:bg-white
            dark:border-white/10
            dark:bg-white/[0.05]
            dark:text-blue-400
            dark:hover:bg-white/[0.08]
            sm:block
          "
        >
          View all
        </button>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="mt-6 space-y-1"
      >
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <motion.div
              key={activity.title}
              variants={{
                hidden: {
                  opacity: 0,
                  x: -12,
                },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="
                group
                flex
                gap-4
                rounded-[20px]
                px-3
                py-4
                transition-colors
                hover:bg-white/45
                dark:hover:bg-white/[0.04]
              "
            >
              <div className="relative flex flex-col items-center">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/70
                    bg-white/65
                    text-blue-700
                    shadow-sm
                    dark:border-white/10
                    dark:bg-white/[0.055]
                    dark:text-blue-400
                  "
                >
                  <Icon className="h-[17px] w-[17px]" />
                </div>

                {index !== activities.length - 1 && (
                  <div
                    className="
                      mt-2
                      h-full
                      w-px
                      bg-slate-200/70
                      dark:bg-white/10
                    "
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 pb-2">
                <div
                  className="
                    flex
                    flex-col
                    gap-1
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    sm:gap-4
                  "
                >
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {activity.title}
                  </p>

                  <p
                    className="
                      shrink-0
                      text-[11px]
                      font-medium
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    {activity.time}
                  </p>
                </div>

                <p
                  className="
                    mt-1
                    max-w-xl
                    text-xs
                    leading-5
                    text-slate-500
                    dark:text-slate-300
                    sm:text-sm
                    sm:leading-6
                  "
                >
                  {activity.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </GlassCard>
  );
}